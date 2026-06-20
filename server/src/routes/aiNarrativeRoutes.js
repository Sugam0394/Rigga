import express from "express";

import verifyJWT
  from "../middlewares/authMiddleware.js";

import aiNarrativeController
  from "../controllers/aiNarrativeController.js";

const router =
  express.Router();

router.get(
  "/challenges/:challengeId/ai-narrative",
  verifyJWT,
  aiNarrativeController
    .getAINarrative
);

export default router;