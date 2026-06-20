import express from "express";

import aiInsightsController
  from "../controllers/aiInsightsController.js";

import verifyJWT
  from "../middlewares/authMiddleware.js";

const router =
  express.Router();

router.get(
  "/challenges/:challengeId/ai-insights",
  verifyJWT,
  aiInsightsController
    .getAIInsights
);

export default router;