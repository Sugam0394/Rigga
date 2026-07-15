 import lifecycleCoordinator from "./lifecycleCoordinator.js";
import userNotificationService
  from "./userNotificationService.js";

import notificationEventService
  from "./notificationEventService.js";

import {
  NOTIFICATION_EVENTS,
} from "../constants/notificationEvents.js";







const onInvitationAccepted = async ({
  challenge,
}) => {
  try {
    await lifecycleCoordinator.onChallengeActive(
      challenge
    );

    // Notification

    // Witness Analytics
  } catch (error) {
    console.error(
      "[WITNESS COORDINATOR][INVITATION_ACCEPTED]",
      error
    );
    throw error;
  }
};

const onInvitationDeclined = async ({
  challenge,
}) => {
  try {
    // Notification

    // Witness Analytics
  } catch (error) {
    console.error(
      "[WITNESS COORDINATOR][INVITATION_DECLINED]",
      error
    );
    throw error;
  }
};

 const onReviewSubmitted = async ({
  challenge,
  decision,
  appealed,
}) => {

  let eventType = null;

  if (decision === "APPROVED") {
    eventType =
      NOTIFICATION_EVENTS
        .CHALLENGE_COMPLETED;
  }

  if (
    decision === "REJECTED" &&
    appealed
  ) {
    eventType =
      NOTIFICATION_EVENTS
        .CHALLENGE_FAILED;
  }

  if (!eventType) {
    return;
  }

  try {

    const notificationEvent =
      notificationEventService
        .createNotificationEvent({
          eventType,

          sourceEngine:
            "WITNESS",

          userId:
            challenge.userId,

          entityType:
            "CHALLENGE",

          entityId:
            challenge._id,

          payload: {
            decision,
            appealed,
          },
        });

    await userNotificationService
      .createEventNotification(
        notificationEvent
      );

  } catch (error) {

    console.error(
      "[WITNESS NOTIFICATION FAILED]",
      error
    );

  }
};

const onAppealSubmitted = async ({
  challenge,
  appeal,
}) => {

  try {

    const notificationEvent =
      notificationEventService
        .createNotificationEvent({
          eventType:
            NOTIFICATION_EVENTS
              .APPEAL_SUBMITTED,

          sourceEngine:
            "WITNESS",

          userId:
            challenge.userId,

          entityType:
            "CHALLENGE",

          entityId:
            challenge._id,

           payload: {
  appealId: appeal._id,
  submittedAt: appeal.submittedAt,
}
        });

    await userNotificationService
      .createEventNotification(
        notificationEvent
      );

  } catch (error) {

    console.error(
      "[WITNESS NOTIFICATION FAILED]",
      error
    );

  }
};

export default {
  onInvitationAccepted,
  onInvitationDeclined,
  onReviewSubmitted,
  onAppealSubmitted,
};