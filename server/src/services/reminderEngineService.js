import reminderRepository from "../repositories/reminderRepository.js";

import notificationDispatcher from "./notificationDispatcher.js";
import reminderDecisionServices from "./reminderDecisionServices.js";
 
import challengeRepository
  from "../repositories/challengeRepositories.js";

import userNotificationService
  from "./userNotificationService.js";

import {
  NOTIFICATION_EVENTS,
} from "../constants/notificationEvents.js";

import {
  REMINDER_STATUS,
} from "../constants/reminderConstants.js";

 const executePendingReminders = async () => {
  console.log("[REMINDER JOB START]");

  const reminders =
    await reminderRepository.getDuePendingReminders(
      new Date()
    );

  for (const reminder of reminders) {
    try {
      console.log(
        `[REMINDER FOUND] ${reminder._id}`
      );

      const challenge =
        await challengeRepository.getChallengeById(
          reminder.challengeId
        );

      const decision =
  await reminderDecisionServices.shouldSendReminder({
    challenge,
    userId: challenge.userId,
  });

      if (!decision.shouldSend) {
        continue;
      }

      await notificationDispatcher.dispatchReminder(
        reminder
      );

      if (challenge) {
        await userNotificationService.createEventNotification(
          {
            userId: challenge.userId,

            type:
              NOTIFICATION_EVENTS.REMINDER_TRIGGERED,

            entityType: "CHALLENGE",

            entityId: challenge._id,
          }
        );
      }

      await reminderRepository.updateReminderStatus(
        reminder._id,
        REMINDER_STATUS.TRIGGERED,
        new Date()
      );
    } catch (error) {
      console.error(
        `[REMINDER ERROR] ${reminder._id}`,
        error
      );
    }
  }
};

export default {
  executePendingReminders,
};