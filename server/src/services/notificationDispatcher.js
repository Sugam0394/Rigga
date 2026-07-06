 import userNotificationService from "./userNotificationService.js";

import {
  NOTIFICATION_EVENTS,
} from "../constants/notificationEvents.js";

const dispatchReminder = async (
  reminderEvent
) => {
  console.log(
    `[REMINDER TRIGGERED] ${reminderEvent.reminderId}`
  );

  await userNotificationService
    .createEventNotification({
      userId:
        reminderEvent.userId,

      type:
        NOTIFICATION_EVENTS
          .REMINDER_TRIGGERED,

      entityType:
        "CHALLENGE",

      entityId:
        reminderEvent.challengeId,
    });
};

export default {
  dispatchReminder,
};