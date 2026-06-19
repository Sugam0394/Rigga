import notificationRepository from "../repositories/notificationRepository.js";


import notificationTemplates from "../templates/notificationTemplates.js";


import { NOTIFICATION_STATUS } from "../constants/notificationConstants.js";

import challengeRepository from "../repositories/challengeRepositories.js"

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
  challengeId , userId
) => {
  const challenge =
  await challengeRepository
    .getChallengeById(
      challengeId
    );

if (!challenge) {
  throw new Error(
    "Challenge not found"
  );
}

if (
  challenge.userId.toString() !==
  userId
) {
  throw new Error(
    "Forbidden"
  );
}
  return notificationRepository.getNotificationsByChallenge(
    challengeId
  );


};

export default {
  createNotification,
  getNotificationsByChallenge,
};