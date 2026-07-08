import express from "express";

import authMiddleware
  from "../middlewares/authMiddleware.js";

import witnessController
  from "../controllers/witnessController.js";

const router = express.Router();

router.get(
  "/challenges/:challengeId/invitation-status",
  authMiddleware,
  witnessController.getInvitationStatus
);

router.get(
  "/challenges/:challengeId/witness-status",
  authMiddleware,
  witnessController.getWitnessStatus
);

router.get(
  "/challenges/:challengeId/review-status",
  authMiddleware,
  witnessController.getReviewStatus
);

router.get(
  "/challenges/:challengeId/appeal-status",
  authMiddleware,
  witnessController.getAppealStatus
);

router.get(
  "/challenges/:challengeId/witness-timeline",
  authMiddleware,
  witnessController.getWitnessTimeline
);

export default router;