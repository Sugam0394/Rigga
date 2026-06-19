 import express from "express";
import authMiddleware from "../middlewares/authMiddleware.js";
import {
  getChallengeNotifications,
} from "../controllers/notificationController.js";

const router = express.Router();

router.get(
  "/challenges/:id/notifications", authMiddleware ,
  getChallengeNotifications
);

export default router;