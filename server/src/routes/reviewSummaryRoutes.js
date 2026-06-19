 import express from "express";
import authMiddleware from "../middlewares/authMiddleware.js"
import { getReviewSummary } from "../controllers/reviewSummaryController.js";

const router = express.Router();

router.get(
  "/challenges/:id/review-summary", authMiddleware ,
  getReviewSummary
);

export default router;