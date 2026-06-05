import express from "express";

import reminderController from "../controllers/reminderController.js";

const router = express.Router();

router.get(
  "/challenges/:id/reminders",
  reminderController.getChallengeReminders
);

export default router;