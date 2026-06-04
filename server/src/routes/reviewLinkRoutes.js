import express from "express";

import {
  generateReviewLink,
} from "../controllers/reviewLinkController.js";

const router = express.Router();

router.post(
  "/challenges/:id/review-link",
  generateReviewLink
);

export default router;