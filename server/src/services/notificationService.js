import notificationRepository from "../repositories/notificationRepository.js";


import notificationTemplates from "../templates/notificationTemplates.js";


import { NOTIFICATION_STATUS } from "../constants/notificationConstants.js";

 

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