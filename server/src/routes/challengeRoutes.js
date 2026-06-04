import express from "express";
import challengeController from "../controllers/challengeController.js";
import witnessReviewController from "../controllers/witnessReviewController.js";
import appealController from "../controllers/appealController.js";

const router = express.Router();

router.post("/challenge", challengeController.createChallenge);

router.patch("/challenge/:id/witness-review", witnessReviewController.submitReview);

router.post("/challenge/:id/appeal", appealController.submitAppeal);


export default router;