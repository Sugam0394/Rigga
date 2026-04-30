 import express from "express";
import { TaskBox } from "../models/taskModel.js";
import { User } from "../models/userModel.js"; // FIXED: Use User, not People

const router = express.Router();

/**
 * ✅ Create a new TaskBox
 */
router.post("/create", async (req, res) => {
  try {
    const { phone, goal, stakeType, stakeUrl, witness, deadline } = req.body;

    // 🛡️ Validation (FIXED: Basic guardrails)
    if (!phone || !goal || !deadline || !witness?.phone) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    // 🔧 Get or create user using whatsappNumber (FIXED: People -> User)
    let user = await User.findOne({ whatsappNumber: phone });
    if (!user) {
      user = await User.create({ 
        whatsappNumber: phone, 
        name: witness.name || "User" 
      });
    }

    // Validate only one pending TaskBox per user
    const hasPending = await TaskBox.findOne({ userId: user._id, status: "pending" });
    if (hasPending) {
      return res.status(400).json({ error: "You already have a pending Task Box." });
    }

    // 🔧 Make TaskBox (FIXED: Initialized proof object)
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
      proof: { url: null, geminiVerdict: null, submittedAt: null } // FIXED: Error 4
    });

    // 🔧 Link to user (FIXED: Fields now exist in User model)
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
 * ✅ GET Active TaskBox (FIXED: Error 5 - Required for Day 2)
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
 * Endpoint: POST /api/task/:taskBoxId/submit-proof
 */
router.post("/:taskBoxId/submit-proof", async (req, res) => {
  try {
    const { taskBoxId } = req.params;
    const { proofUrl } = req.body;

    if (!proofUrl) {
      return res.status(400).json({ error: "Proof URL is required" });
    }

    // 1. Task dhundo
    const taskBox = await TaskBox.findById(taskBoxId);
    if (!taskBox) {
      return res.status(404).json({ error: "TaskBox not found" });
    }

    if (taskBox.status !== "pending") {
      return res.status(400).json({ error: "Proof already submitted or task expired" });
    }

    const now = new Date();
    const isLate = now > taskBox.deadline;

    // 2. Update proof object
    taskBox.proof = {
      url: proofUrl,
      geminiVerdict: null, // Day 3 mein Gemini update karega
      submittedAt: now,
    };

    // 3. Status logic (On-time vs Late)
    if (isLate) {
      taskBox.status = "failed";
      taskBox.level = 2; // Level up for failure
    } else {
      taskBox.status = "done";
      taskBox.level = 4; // High level for success
    }

    // 4. Log the action
    taskBox.escalationLog.push({
      at: now,
      action: "proof_submitted",
      payload: proofUrl,
      outcome: taskBox.status,
    });

    await taskBox.save();

    // 5. Update User Stats (Wins/Fails)
    const user = await User.findById(taskBox.userId);
    if (user) {
      if (taskBox.status === "done") {
        user.totalWins = (user.totalWins || 0) + 1;
      } else {
        user.totalFails = (user.totalFails || 0) + 1;
      }
      // Task link release (optional: depends if you want to keep activeTaskBox until next day)
      user.activeTaskBox = null; 
      await user.save();
    }

    res.json({ 
      success: true, 
      message: isLate ? "Late submission recorded" : "Task completed successfully",
      status: taskBox.status 
    });

  } catch (err) {
    console.error("❌ Proof Submit Error:", err.message);
    res.status(500).json({ error: "Failed to submit proof" });
  }
});

export default router;