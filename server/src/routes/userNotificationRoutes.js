import express from "express";

import authMiddleware
  from "../middlewares/authMiddleware.js";

import {
  getUserNotifications,
  getUnreadCount,
  markNotificationRead,
  markAllNotificationsRead,
} from "../controllers/userNotificationController.js";

const router =
  express.Router();

router.get(
  "/notifications",
  authMiddleware,
  getUserNotifications
);

router.get(
  "/notifications/unread-count",
  authMiddleware,
  getUnreadCount
);

router.patch(
  "/notifications/read-all",
  authMiddleware,
  markAllNotificationsRead
);

router.patch(
  "/notifications/:id/read",
  authMiddleware,
  markNotificationRead
);

 

export default router;