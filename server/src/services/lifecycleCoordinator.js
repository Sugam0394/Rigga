import userNotificationService
  from "./userNotificationService.js";

import {
  NOTIFICATION_EVENTS,
} from "../constants/notificationEvents.js";

const onChallengeUnderReview = async (
  challenge
) => {
  try {
    await userNotificationService
      .createEventNotification({
        userId:
          challenge.userId,

        type:
          NOTIFICATION_EVENTS
            .CHALLENGE_UNDER_REVIEW,

        entityType:
          "CHALLENGE",

        entityId:
          challenge._id,
      });

  } catch (error) {

    console.error(
      "[LIFECYCLE COORDINATION ERROR]",
      error
    );

    // Coordination failures must never
    // block Lifecycle transitions.
  }
};

const onChallengeActive = async (
  challenge
) => {
  try {
    // Future:
    // Notification Engine
    // Reminder Engine
    // Progress Engine
  } catch (error) {
    console.error(
      "[LIFECYCLE COORDINATION ERROR]",
      error
    );
  }
};

export default {
  onChallengeUnderReview,
  onChallengeActive,
};