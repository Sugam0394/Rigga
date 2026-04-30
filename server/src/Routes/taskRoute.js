 import express from "express";
import { TaskBox } from "../models/taskModel.js";
import { User } from "../models/userModel.js";
import { validateProofWithGroq } from "../validators/visionValidator.js";// 🔥 Added for Error #4
import { unlockNextTaskBox } from "../services/taskBoxServices.js"; // 🔥 Added for Error #7

const router = express.Router();

/**
 * ✅ Create a new TaskBox
 */
router.post("/create", async (req, res) => {
  try {
    const { phone, goal, stakeType, stakeUrl, witness, deadline } = req.body;

    if (!phone || !goal || !deadline || !witness?.phone) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    let user = await User.findOne({ whatsappNumber: phone });
    if (!user) {
      user = await User.create({ 
        whatsappNumber: phone, 
        name: witness.name || "User",
        state: 'active'
      });
    }

    const hasPending = await TaskBox.findOne({ userId: user._id, status: "pending" });
    if (hasPending) {
      return res.status(400).json({ error: "You already have a pending Task Box." });
    }

    const taskBox = await TaskBox.create({
      userId: user._id,
      goal,
      stakeType,
      stakeUrl,
      witness: {
        name: witness.name,
        phone: witness.phone,
      },
      deadline: new Date(deadline),
      proof: { url: null, geminiVerdict: "none", submittedAt: null }
    });

    user.activeTaskBox = taskBox._id;
    user.taskBoxes.push(taskBox._id);
    await user.save();

    res.json({ success: true, taskBox });
  } catch (err) {
    console.error("❌ Task Creation Error:", err);
    res.status(500).json({ error: "Failed to create TaskBox" });
  }
});

/**
 * ✅ GET Active TaskBox
 */
router.get("/:phone/active", async (req, res) => {
  try {
    const user = await User.findOne({ whatsappNumber: req.params.phone })
      .populate("activeTaskBox");
    
    if (!user || !user.activeTaskBox) {
      return res.status(404).json({ error: "No active task found" });
    }
    res.json(user.activeTaskBox);
  } catch (err) {
    res.status(500).json({ error: "Internal server error" });
  }
});

/**
 * ✅ Submit Proof & Trigger AI Chain (Error #3 & #4)
 */
router.post("/:taskBoxId/submit-proof", async (req, res) => {
  try {
    const { taskBoxId } = req.params;
    const { proofUrl } = req.body;

    if (!proofUrl) return res.status(400).json({ error: "Proof URL is required" });

    const taskBox = await TaskBox.findById(taskBoxId);
    if (!taskBox || taskBox.status !== "pending") {
      return res.status(404).json({ error: "Task not found or already processed" });
    }

    const now = new Date();
    const isLate = now > taskBox.deadline;

    // 🔥 Trigger AI Vision Validation (Error #4)
    const verdict = await validateProofWithGroq(proofUrl, taskBox.goal);

    taskBox.proof = {
      url: proofUrl,
      geminiVerdict: verdict,
      submittedAt: now,
    };

    // 🏆 Logic: Late submission ya Fake image = Failed
    if (isLate || verdict === "fake") {
      taskBox.status = "failed";
      taskBox.level = Math.min((taskBox.level || 1) + 1, 4);
    } else {
      taskBox.status = "done";
    }

    taskBox.escalationLog.push({
      at: now,
      action: "proof_submitted",
      payload: `Verdict: ${verdict}`,
      outcome: taskBox.status,
    });

    await taskBox.save();

    // 📈 Update User Stats & Unlock Next (Error #7)
    const user = await User.findById(taskBox.userId);
    if (user) {
      if (taskBox.status === "done") {
        user.totalWins += 1;
        user.currentStreak += 1;
      } else {
        user.totalFails += 1;
        user.currentStreak = 0;
      }
      
      await user.save();
      
      // 🔥 Automatically unlock next TaskBox so the cycle continues
      await unlockNextTaskBox(user._id);
    }

    res.json({ 
      success: true, 
      verdict,
      status: taskBox.status 
    });

  } catch (err) {
    console.error("❌ Proof Submit Error:", err.message);
    res.status(500).json({ error: "Failed to submit proof" });
  }
});

export default router;