 import express from "express";

import authMiddleware
  from "../middlewares/authMiddleware.js";

import witnessAnalyticsController from "../controllers/witnessAnalyticsController.js"

import witnessTrackingController from "../controllers/witnessTrackingController.js";



const router = express.Router();

router.get("/analytics/:challengeId",authMiddleware,witnessAnalyticsController.getWitnessFunnel);


router.post(
  "/analytics/:challengeId/share",
  authMiddleware,
  witnessTrackingController
    .trackShare
);

export default router;