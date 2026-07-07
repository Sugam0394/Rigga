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

 const markNotificationRead = async (
  notificationId,
  userId
) => {
  return UserNotification
    .findOneAndUpdate(
      {
        _id: notificationId,
        userId,
      },
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
const getUnreadNotifications = async (
  userId
) => {
  return UserNotification
    .find({
      userId,
      isRead: false,
    })
    .sort({
      createdAt: -1,
    });
};

const getNotificationById = async (
  notificationId,
  userId
) => {
  return UserNotification
    .findOne({
      _id: notificationId,
      userId,
    });
};

const updateDeliveryOutcome = async (
  notificationId,
  deliveryResult
) => {

  return UserNotification
    .findByIdAndUpdate(
      notificationId,
      {
        $set: {
          delivery: {
            channel:
              deliveryResult.channel,

            status:
              deliveryResult.status,

            reason:
              deliveryResult.reason,

            attemptedAt:
              deliveryResult.attemptedAt,

            deliveredAt:
              deliveryResult.deliveredAt,
          },
        },

        $inc: {
          "delivery.attempts": 1,
        },
      },
      {
        new: true,
      }
    );
};


 export default {
  createNotification,
  getUserNotifications,
  getUnreadCount,
  getUnreadNotifications,
  getNotificationById,
  markNotificationRead,
  markAllNotificationsRead,
  updateDeliveryOutcome,
};