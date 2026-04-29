import express from "express";
import { TaskBox } from "../models/taskModel.js";
 import { People } from "../models/peopleModel.js";

const router = express.Router();

/**
 * Create a new TaskBox
 * Required: phone, goal, stakeType, stakeUrl, witness { name, phone }, deadline
 */
router.post("/create", async (req, res) => {
  try {
    const { phone, goal, stakeType, stakeUrl, witness, deadline } = req.body;

    // Get or create user
    let user = await People.findOne({ phone });
    if (!user) {
      user = await People.create({ phone, name: witness.name || "User" });
    }

    // Validate only one pending TaskBox per user
    const hasPending = await TaskBox.findOne({ userId: user._id, status: "pending" });
    if (hasPending) {
      return res.status(400).json({ error: "You already have a pending Task Box." });
    }

    // Make TaskBox
    const taskBox = await TaskBox.create({
      userId: user._id,
      goal,
      stakeType,
      stakeUrl,
      witness,
      deadline: new Date(deadline),
    });

    // Link to user
    user.activeTaskBox = taskBox._id;
    user.taskBoxes.push(taskBox._id);
    await user.save();

    res.json({ success: true, taskBox });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to create TaskBox" });
  }
});

export default router;