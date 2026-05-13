 import express from "express";
import { TaskBox } from "../models/taskModel.js";
import { User } from "../models/userModel.js";
import { validateProofWithGroq } from "../validators/visionValidator.js";
import { unlockNextTaskBox } from "../services/taskBoxServices.js";
import{ protect }from "../middlewares/auth.js";

const router = express.Router();

 
 router.post("/create", async (req, res) => {
  try {
    const { phone, goal, stakeType, stakeUrl, witness = {}, deadline } = req.body;

    if (!phone || !goal || !deadline || !witness?.phone) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    // ✅ find user
    let user = await User.findOne({ whatsappNumber: phone });

    if (!user) {
      user = await User.create({ 
        whatsappNumber: phone,
        name: witness?.name || "User",
        state: 'active',
        currentStreak: 0
      });
    }

    // ✅ REMOVE THIS TEMP (suspect)
    // const hasPending = await TaskBox.findOne({ userId: user._id, status: "pending" });

    // if (hasPending) {
    //   return res.status(400).json({ error: "Focus on your current task first!" });
    // }

    // ✅ create task safely
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
      proof: {
        url: null,
        geminiVerdict: "none",
        submittedAt: null
      }
    });

    await User.findByIdAndUpdate(user._id, {
      $set: { activeTaskBox: taskBox._id },
      $push: { taskBoxes: taskBox._id }
    });

    res.status(201).json({ success: true, taskBox });

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
    const user = await User.findOne({ whatsappNumber: req.params.whatsappNumber })
      .populate("activeTaskBox");
    
    if (!user) return res.status(404).json({ error: "User not found" });
    
    res.json({
      activeTask: user.activeTaskBox,
      stats: {
        totalWins: user.totalWins || 0,
        totalFails: user.totalFails || 0,
        currentStreak: user.currentStreak || 0
      }
    });
  } catch (err) {
    res.status(500).json({ error: "Internal server error" });
  }
});

/**
 * ✅ Submit Proof & Execute Logic (The Core Game Engine)
 */
router.post("/:taskBoxId/submit-proof", async (req, res) => {
  try {
    const { taskBoxId } = req.params;
    const { proofUrl } = req.body;

    if (!proofUrl) return res.status(400).json({ error: "Upload your proof first!" });

    const taskBox = await TaskBox.findById(taskBoxId);
    if (!taskBox || taskBox.status !== "pending") {
      return res.status(404).json({ error: "Task expired or not found" });
    }

    const now = new Date();
    const isLate = now > taskBox.deadline;

    // AI Validation with Fallback[cite: 1]
    let verdict = "unclear";
    try {
      verdict = await validateProofWithGroq(proofUrl, taskBox.goal);
    } catch (aiErr) {
      console.warn("⚠️ AI Validator failed, defaulting to manual review.");
    }

    taskBox.proof = { url: proofUrl, geminiVerdict: verdict, submittedAt: now };

    // 💀 Savage Logic: Deadline Missed or Fake Image
    if (isLate || verdict === "fake") {
      taskBox.status = "failed";
      taskBox.level = Math.min((taskBox.level || 1) + 1, 4);
    } else {
      taskBox.status = "done";
    }

    taskBox.escalationLog.push({
      at: now,
      action: "proof_submitted",
      payload: `AI Verdict: ${verdict} | Late: ${isLate}`,
      outcome: taskBox.status,
    });

    await taskBox.save();

    // Stats Update with Atomic Logic[cite: 1]
    const updateQuery = taskBox.status === "done" 
      ? { $inc: { totalWins: 1, currentStreak: 1 } }
      : { $inc: { totalFails: 1 }, $set: { currentStreak: 0 } };

    await User.findByIdAndUpdate(taskBox.userId, updateQuery);
    
    // 🚀 Trigger Next Task Logic
    const nextTask = await unlockNextTaskBox(taskBox.userId);

    res.json({ 
      success: true, 
      verdict,
      status: taskBox.status,
      nextTaskId: nextTask?._id || null
    });

  }  catch (err) {
    console.error("❌ FULL ERROR:", err);

    res.status(500).json({
      error: err.message,
      details: err.errors || null
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