import userNotificationRepository from "../repositories/userNotificationRepository.js";
import notificationFactory  from "./notificationEvents.js"

const createNotification = async ({
  userId,
  type,
  title,
  message,
  entityType = null,
  entityId = null,
}) => {
  return userNotificationRepository
    .createNotification({
      userId,
      type,
      title,
      message,
      entityType,
      entityId,
    });
};

const getUserNotifications = async (userId) => {
    return userNotificationRepository
      .getUserNotifications(
        userId
      );
  };

const getUnreadCount = async (userId) => {
    return userNotificationRepository
      .getUnreadCount(
        userId
      );
  };

 const markNotificationRead = async (
    notificationId,
    userId
  ) => {
    return userNotificationRepository
      .markNotificationRead(
        notificationId,
        userId
      );
  };

const markAllNotificationsRead =  async (userId) => {
    return userNotificationRepository
      .markAllNotificationsRead(
        userId
      );
  };


  
  const createEventNotification = async ({
    userId,
    type,
    entityType = null,
    entityId = null,
  }) => {

    const {
      title,
      message,
    } =
      notificationFactory
        .buildNotification({
          type,
        });

    return userNotificationRepository
      .createNotification({
        userId,
        type,
        title,
        message,
        entityType,
        entityId,
      });
  };

export default {
  createNotification,
  getUserNotifications,
  getUnreadCount,
  markNotificationRead,
  markAllNotificationsRead,
  createEventNotification
};