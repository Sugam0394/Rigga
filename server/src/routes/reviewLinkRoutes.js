import express from "express";
import authMiddleware from "../middlewares/authMiddleware.js"
import {
  generateReviewLink,
} from "../controllers/reviewLinkController.js";

const router = express.Router();

router.post(
  "/challenges/:id/review-link",
  authMiddleware,
  generateReviewLink
);

export default router;