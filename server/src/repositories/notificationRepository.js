import Notification from "../models/notificationModel.js";

const createNotification = async (notificationData) => {
  return Notification.create(notificationData);
};

const getNotificationsByChallenge = async (challengeId) => {
  return Notification.find({ challengeId }).sort({
    createdAt: -1,
  });
};

const updateNotificationStatus = async (
  notificationId,
  updateData
) => {
  return Notification.findByIdAndUpdate(
    notificationId,
    updateData,
    {
      new: true,
    }
  );
};

export default {
  createNotification,
  getNotificationsByChallenge,
  updateNotificationStatus,
};