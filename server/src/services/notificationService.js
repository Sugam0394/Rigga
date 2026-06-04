import notificationRepository from "../repositories/notificationRepository.js";

import notificationRepository from "../repositories/notificationRepository.js"



 const createNotification = async ({
  challengeId,
  recipientType,
  recipientPhone,
  type,
  challengeTitle,
  userName,
}) => {
  const message =
    notificationTemplates.buildNotificationMessage({
      type,
      challengeTitle,
      userName,
    });

  return notificationRepository.createNotification({
    challengeId,
    recipientType,
    recipientPhone,
    type,
    message,
    status: NOTIFICATION_STATUS.PENDING,
  });
};

const getNotificationsByChallenge = async (
  challengeId
) => {
  return notificationRepository.getNotificationsByChallenge(
    challengeId
  );
};

export default {
  createNotification,
  getNotificationsByChallenge,
};