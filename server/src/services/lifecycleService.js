 import challengeRepository from "../repositories/challengeRepositories.js";
import userNotificationService
  from "./userNotificationService.js";

import {
  NOTIFICATION_EVENTS,
} from "../constants/notificationEvents.js";
import {
  CHALLENGE_STATUS,
} from "../constants/challengeStatus.js";

const evaluateChallengeLifecycle = async (challenge) => {
    if (!challenge) {
      return null;
    }

    const now =
      new Date();
    if (
  challenge.status ===
    CHALLENGE_STATUS.ACTIVE &&
  challenge.deadlineAt &&
  challenge.deadlineAt < now
)  {
      const updatedChallenge =
  await challengeRepository
    .updateStatus(
      challenge._id,
      CHALLENGE_STATUS.UNDER_REVIEW
    );

await userNotificationService
  .createEventNotification({
    userId:
      updatedChallenge.userId,

    type:
      NOTIFICATION_EVENTS
        .CHALLENGE_UNDER_REVIEW,

    entityType:
      "CHALLENGE",

    entityId:
      updatedChallenge._id,
  });

return updatedChallenge;
    }

    return challenge;
  };

export default {
  evaluateChallengeLifecycle,
};