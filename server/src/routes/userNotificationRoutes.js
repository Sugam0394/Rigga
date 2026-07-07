import express from "express";

import authMiddleware
  from "../middlewares/authMiddleware.js";

 import {
  getNotificationTimeline,
  getNotificationSummary,
  getUnreadNotifications,
  getNotification,
  getUnreadCount,
  markNotificationRead,
  markAllNotificationsRead,
} from "../controllers/userNotificationController.js";

const router =
  express.Router();

 router.get(
  "/notifications",
  authMiddleware,
  getNotificationTimeline
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

router.get(
  "/notifications/summary",
  authMiddleware,
  getNotificationSummary
);

 router.get(
  "/notifications/unread",
  authMiddleware,
  getUnreadNotifications
);


router.get(
  "/notifications/:id",
  authMiddleware,
  getNotification
);

export default router;