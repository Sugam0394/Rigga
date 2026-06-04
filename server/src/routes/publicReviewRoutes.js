import express from "express";

import {
  getPublicReview,
} from "../controllers/publicReviewController.js";

const router = express.Router();

router.get("/review/:token",getPublicReview);

export default router;