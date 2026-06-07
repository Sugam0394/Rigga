import express from "express";
import authMiddleware from "../middlewares/authMiddleware.js";
import reminderController from "../controllers/reminderController.js";

const router = express.Router();

router.get(
  "/challenges/:id/reminders", authMiddleware ,
  reminderController.getChallengeReminders
);

export default router;