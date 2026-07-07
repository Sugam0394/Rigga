import userNotificationService
  from "./userNotificationService.js";

import {
  NOTIFICATION_EVENTS,
} from "../constants/notificationEvents.js";
import notificationEventService from "./notificationEventService.js"



const onChallengeUnderReview = async (
  challenge
) => {
  try {
    const notificationEvent =
  notificationEventService
    .createNotificationEvent({
      eventType:
        NOTIFICATION_EVENTS
          .CHALLENGE_UNDER_REVIEW,

      sourceEngine:
        "LIFECYCLE",

      userId:
        challenge.userId,

      entityType:
        "CHALLENGE",

      entityId:
        challenge._id,

      payload: {
        status:
          "UNDER_REVIEW",
      },
    });

await userNotificationService
  .createEventNotification(
    notificationEvent
  );

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