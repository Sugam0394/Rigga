import userNotificationRepository from "../repositories/userNotificationRepository.js";
 import notificationTemplateService from "./notificationTemplateService.js"
import notificationCoordinator from "./notificationCoordinator.js"



 const createEventNotification = async (
  notificationEvent,
  runtimeContext = {
    appState: "ACTIVE",
  }
) => {

  const {
    userId,
    eventType,
    entityType,
    entityId,
  } = notificationEvent;

  const {
    title,
    message,
  } =
    notificationTemplateService
      .resolveNotificationTemplate(
        notificationEvent
      );

  const notification =
    await userNotificationRepository
      .createNotification({
        userId,
        type:
          eventType,
        title,
        message,
        entityType,
        entityId,
      });

  await notificationCoordinator
    .deliverNotification(
      notification,
      runtimeContext
    );

  return notification;

};

 const getNotificationTimeline = async (
  userId
) => {
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
const getUnreadNotifications = async (
  userId
) => {
  return userNotificationRepository
    .getUnreadNotifications(
      userId
    );
};
const getNotificationSummary = async (
  userId
) => {

  const notifications =
    await userNotificationRepository
      .getUserNotifications(
        userId
      );

  const unreadNotifications =
    await userNotificationRepository
      .getUnreadCount(
        userId
      );

  return {
    totalNotifications:
      notifications.length,

    unreadNotifications,

    latestNotification:
      notifications[0] ?? null,

    lastReadAt: null,
  };
};
const getNotification = async (
  userId,
  notificationId
) => {
  return userNotificationRepository
    .getNotificationById(
      notificationId,
      userId
    );
};
  
 

 export default {
  createNotification,
  getUnreadCount,
  markNotificationRead,
  markAllNotificationsRead,
  createEventNotification,
  getNotificationTimeline,
  getNotificationSummary,
  getUnreadNotifications,
  getNotification,
};