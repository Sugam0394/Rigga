import express from "express";

import { Challenge } from "../models/challengeModel.js";

const router = express.Router();


router.get("/challenges", async (req, res) => {
  try {
    const { category, type } = req.query;

    const filter = {
      isActive: true,
    };

    // category filter
    if (category) {
      filter.category = category;
    }

    // free / paid filter
    if (type === "free") {
      filter.isPaid = false;
    }

    if (type === "paid") {
      filter.isPaid = true;
    }

    const challenges = await Challenge.find(filter).sort({
      createdAt: -1,
    });

    res.status(200).json({
      success: true,
      count: challenges.length,
      challenges,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch challenges",
    });
  }
});

router.get("/challenges/:id", async (req, res) => {
  try {
    const challenge = await Challenge.findById(
      req.params.id
    );

    if (!challenge) {
      return res.status(404).json({
        success: false,
        message: "Challenge not found",
      });
    }

    res.status(200).json({
      success: true,
      challenge,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch challenge",
    });
  }
});

export default router