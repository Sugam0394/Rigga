 import userNotificationService from "./userNotificationService.js";
 import notificationEventService from "./notificationEventService.js";
import {
  NOTIFICATION_EVENTS,
} from "../constants/notificationEvents.js";

const dispatchReminder = async (
  reminderEvent
) => {
  console.log(
    `[REMINDER TRIGGERED] ${reminderEvent.reminderId}`
  );

  const notificationEvent =
  notificationEventService
    .createNotificationEvent({
      eventType:
        NOTIFICATION_EVENTS
          .REMINDER_TRIGGERED,

      sourceEngine:
        "REMINDER",

      userId:
        reminderEvent.userId,

      entityType:
        "CHALLENGE",

      entityId:
        reminderEvent.challengeId,

      payload: {
        reminderId:
          reminderEvent.reminderId,

        reminderType:
          reminderEvent.reminderType,

        urgency:
          reminderEvent.urgency,

        tone:
          reminderEvent.tone,

        observationMode:
          reminderEvent.observationMode,

        scheduledFor:
          reminderEvent.scheduledFor,
      },
    });

await userNotificationService
  .createEventNotification(
    notificationEvent
  );
};

export default {
  dispatchReminder,
};