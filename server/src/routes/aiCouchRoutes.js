import { Router }
  from "express";

import aiCoachController
  from "../controllers/aiCouchController.js";

import verifyJWT
  from "../middlewares/authMiddleware.js";

const router =
  Router();

router.get(
  "/challenges/:challengeId/ai-coach",
  verifyJWT,
  aiCoachController.getAICoach
);

export default router;