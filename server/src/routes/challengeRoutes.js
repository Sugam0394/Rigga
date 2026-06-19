import express from "express";
import challengeController from "../controllers/challengeController.js";
import witnessReviewController from "../controllers/witnessReviewController.js";
import appealController from "../controllers/appealController.js";
import authMiddleware from "../middlewares/authMiddleware.js"
const router = express.Router();

router.post("/challenge",  authMiddleware ,challengeController.createChallenge);

router.patch("/challenge/:id/witness-review", authMiddleware, witnessReviewController.submitReview);

router.post("/challenge/:id/appeal", authMiddleware, appealController.submitAppeal);

router.get("/challenges" , authMiddleware ,challengeController.getUserChallenges )



export default router;