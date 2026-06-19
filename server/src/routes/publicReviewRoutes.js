 import express from "express";

import {
  getPublicReview,
} from "../controllers/publicReviewController.js";

import publicReviewSubmissionController
  from "../controllers/publicReviewSubmissionController.js";

 








const router = express.Router();

router.get(
  "/review/:token",
  getPublicReview
);

router.patch(
  "/review/:token/submit",
  publicReviewSubmissionController
    .submitPublicReview
);

export default router;