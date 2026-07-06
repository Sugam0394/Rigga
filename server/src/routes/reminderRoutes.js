 import express from "express";
import authMiddleware from "../middlewares/authMiddleware.js";
import reminderController from "../controllers/reminderController.js";

const router = express.Router();

router.get(
  "/challenges/:id/reminders",
  authMiddleware,
  reminderController.getChallengeReminders
);

router.get(
  "/challenges/:id/reminder-status",
  authMiddleware,
  reminderController.getReminderStatus
);

router.get(
  "/challenges/:id/reminder-decision",
  authMiddleware,
  reminderController.getReminderDecision
);

router.get(
  "/challenges/:id/reminder-history",
  authMiddleware,
  reminderController.getReminderHistory
);

export default router;