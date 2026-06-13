import {
  UserNotification,
} from "../models/userNotificationModel.js";

const createNotification =  async (notificationData) => {
    return UserNotification.create(
      notificationData
    );
  };

const getUserNotifications = async (userId) => {
    return UserNotification
      .find({ userId })
      .sort({
        createdAt: -1,
      });
  };

const getUnreadCount = async (userId) => {
    return UserNotification.countDocuments({
      userId,
      isRead: false,
    });
  };

const markNotificationRead =  async (notificationId) => {
    return UserNotification
      .findByIdAndUpdate(
        notificationId,
        {
          $set: {
            isRead: true,
          },
        },
        {
          new: true,
        }
      );
  };

const markAllNotificationsRead = async (userId) => {
    return UserNotification
      .updateMany(
        {
          userId,
          isRead: false,
        },
        {
          $set: {
            isRead: true,
          },
        }
      );
  };

export default {
  createNotification,
  getUserNotifications,
  getUnreadCount,
  markNotificationRead,
  markAllNotificationsRead,
};