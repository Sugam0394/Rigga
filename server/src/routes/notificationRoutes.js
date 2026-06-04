 import express from "express";

import {
  getChallengeNotifications,
} from "../controllers/notificationController.js";

const router = express.Router();

router.get(
  "/challenges/:id/notifications",
  getChallengeNotifications
);

export default router;