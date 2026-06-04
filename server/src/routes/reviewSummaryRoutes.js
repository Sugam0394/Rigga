 import express from "express";

import { getReviewSummary } from "../controllers/reviewSummaryController.js";

const router = express.Router();

router.get(
  "/challenges/:id/review-summary",
  getReviewSummary
);

export default router;