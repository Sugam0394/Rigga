 import express from "express";
import { TaskBox } from "../models/taskModel.js";
import { User } from "../models/userModel.js";
import { validateProofWithGroq } from "../validators/visionValidator.js";
import { unlockNextTaskBox } from "../services/taskBoxServices.js";
import{ protect }from "../middlewares/auth.js";

const router = express.Router();

 
 router.post("/create", protect, async (req, res) => {
  try {
    const {
      goal,
      stakeType,
      stakeUrl,
      witness = {},
      deadline
    } = req.body;

    // ✅ logged-in user from JWT
    const phone = req.user.whatsappNumber;

    if (!goal || !deadline || !witness?.phone) {
      return res.status(400).json({
        error: "Missing required fields"
      });
    }

    // ✅ find logged-in user
    const user = await User.findOne({
      whatsappNumber : req.user.whatsappNumber
    });

    // 🚨 prevent multiple active tasks
if (user?.activeTaskBox) {

  const existingTask =
    await TaskBox.findById(
      user.activeTaskBox
    );

  // only block pending tasks
  if (
    existingTask &&
    existingTask.status === "pending"
  ) {

    return res.status(400).json({
      error:
        "Finish your current task first!"
    });

  }

}
    // ✅ create task
    const taskBox = await TaskBox.create({
      userId: user._id,
      goal,
      stakeType: stakeType || "photo",
      stakeUrl: stakeUrl || "pending",

      witness: {
        name: witness?.name || "Unknown",
        phone: witness?.phone
      },

      deadline: new Date(deadline),

      status: "pending",

      proof: {
        url: null,
        geminiVerdict: "none",
        submittedAt: null
      }
    });

    // ✅ link task to user
    await User.findByIdAndUpdate(user._id, {
      $set: {
        activeTaskBox: taskBox._id
      },

      $push: {
        taskBoxes: taskBox._id
      }
    });

    res.status(201).json({
      success: true,
      taskBox
    });

  } catch (err) {
    console.error("❌ FULL ERROR:", err);

    res.status(500).json({
      error: err.message,
      details: err.errors || null
    });
  }
});

/**
 * ✅ GET Active Task (With User Stats for Dashboard)
 */
 
router.get("/active", protect, async (req, res) => {

  try {

    // ✅ current user
    const user = await User.findOne({
      whatsappNumber: req.user.whatsappNumber
    }).populate("activeTaskBox");

    if (!user) {

      return res.status(404).json({
        error: "User not found"
      });

    }

    let activeTask = user.activeTaskBox;

    // ✅ no task
    if (!activeTask) {

      return res.json({
        activeTask: null,

        stats: {
          totalWins: user.totalWins || 0,
          totalFails: user.totalFails || 0,
          currentStreak: user.currentStreak || 0
        }
      });

    }

    // 🔥 AUTO EXPIRE SYSTEM
    const now = new Date();

    const isExpired =
      now > new Date(activeTask.deadline);

    // ✅ if expired + still pending
    if (
      isExpired &&
      activeTask.status === "pending"
    ) {

      activeTask.status = "failed";

      activeTask.escalationLog.push({
        at: now,
        action: "auto_failed",
        payload: "Deadline crossed",
        outcome: "failed"
      });

      await activeTask.save();

      // ✅ update stats
      await User.findByIdAndUpdate(
        user._id,
        {
          $inc: {
            totalFails: 1
          },

          $set: {
            currentStreak: 0,
            activeTaskBox: null
          }
        }
      );

      // 🚀 return no task now
      return res.json({

        activeTask: null,

        stats: {
          totalWins: user.totalWins || 0,
          totalFails:
            (user.totalFails || 0) + 1,
          currentStreak: 0
        }
      });

    }

    // ✅ normal response
    res.json({

      activeTask,

      stats: {
        totalWins: user.totalWins || 0,
        totalFails: user.totalFails || 0,
        currentStreak: user.currentStreak || 0
      }

    });

  } catch (err) {

    console.error(
      "ACTIVE TASK ERROR:",
      err
    );

    res.status(500).json({
      error: "Internal server error"
    });

  }

});

/**
 * ✅ Submit Proof & Execute Logic (The Core Game Engine)
 */
 
router.post("/:taskBoxId/submit-proof", protect, async (req, res) => {
  try {

    const { taskBoxId } = req.params;
    const { proofUrl } = req.body;

    // ✅ validation
    if (!proofUrl) {
      return res.status(400).json({
        error: "Upload your proof first!"
      });
    }

    // ✅ find task
    const taskBox = await TaskBox.findById(taskBoxId);

    if (!taskBox) {
      return res.status(404).json({
        error: "Task not found"
      });
    }

    // ✅ security check
    const user = await User.findOne({
      whatsappNumber: req.user.whatsappNumber
    });

    if (!user) {
      return res.status(404).json({
        error: "User not found"
      });
    }

    // 🚨 prevent other users submitting proof
    if (taskBox.userId.toString() !== user._id.toString()) {
      return res.status(403).json({
        error: "Unauthorized access"
      });
    }

    // 🚨 already completed
    if (taskBox.status !== "pending") {
      return res.status(400).json({
        error: "Task already completed or failed"
      });
    }

    const now = new Date();

    // ✅ deadline check
    const isLate = now > taskBox.deadline;

    // 🔥 AI VALIDATION
    let verdict = "unclear";

    try {

      verdict = await validateProofWithGroq(
        proofUrl,
        taskBox.goal
      );

    } catch (aiErr) {

      console.warn(
        "⚠️ AI validation failed:",
        aiErr.message
      );

      verdict = "unclear";
    }

    // ✅ save proof
    taskBox.proof = {
      url: proofUrl,
      geminiVerdict: verdict,
      submittedAt: now
    };

    // 💀 FAIL LOGIC
    if (isLate || verdict === "fake") {

      taskBox.status = "failed";

      taskBox.level = Math.min(
        (taskBox.level || 1) + 1,
        4
      );

    }

    // ✅ SUCCESS
    else {

      taskBox.status = "done";

    }

    // ✅ logs
    taskBox.escalationLog.push({
      at: now,
      action: "proof_submitted",
      payload: `AI Verdict: ${verdict} | Late: ${isLate}`,
      outcome: taskBox.status
    });

    // ✅ save task
    await taskBox.save();

    // ✅ CLEAR ACTIVE TASK
    await User.findByIdAndUpdate(
      taskBox.userId,
      {
        $set: {
          activeTaskBox: null
        }
      }
    );

    // ✅ UPDATE STATS
    const updateQuery =
      taskBox.status === "done"

        ? {
            $inc: {
              totalWins: 1,
              currentStreak: 1
            }
          }

        : {
            $inc: {
              totalFails: 1
            },

            $set: {
              currentStreak: 0
            }
          };

    await User.findByIdAndUpdate(
      taskBox.userId,
      updateQuery
    );

    // 🚀 optional next task system
    let nextTask = null;

    try {
      nextTask = await unlockNextTaskBox(
        taskBox.userId
      );
    } catch (unlockErr) {

      console.log(
        "No next task unlocked"
      );

    }

    // ✅ final response
    res.json({
      success: true,

      verdict,

      status: taskBox.status,

      nextTaskId: nextTask?._id || null
    });

  } catch (err) {

    console.error(
      "❌ SUBMIT PROOF ERROR:",
      err
    );

    res.status(500).json({
      error: "Internal server error",
      details: err.message
    });
  }
});

router.get("/:phone/history", async (req, res) => {
  try {
    const user = await User.findOne({ whatsappNumber: req.params.phone });
    console.log("REQ PHONE:", req.params.phone);
    if (!user) return res.status(404).json({ error: "User not found" });

    const taskBoxes = await TaskBox.find({ userId: user._id }).sort({ createdAt: -1 }).lean();

    const stats = {
      totalTasks: taskBoxes.length,
      completed: taskBoxes.filter(t => t.status === 'done').length,
      failed: taskBoxes.filter(t => t.status === 'failed').length,
      currentStreak: user.currentStreak || 0,
    };

    res.json({ user: { name: user.name, ...stats }, taskBoxes });
  } catch (err) {
    res.status(500).json({ error: "History fetch failed" });
  }
});

export default router;