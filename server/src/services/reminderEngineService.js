 import reminderRepository from "../repositories/reminderRepository.js";
import reminderDecisionService from "./reminderDecisionServices.js";
import reminderCoordinator from "./reminderCoordinator.js";

import challengeRepository from "../repositories/challengeRepositories.js";

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

      // Fix #1: Handle deleted/missing challenge safely
      if (!challenge) {
        await reminderRepository.updateReminderStatus(
          reminder._id,
          REMINDER_STATUS.EXPIRED,
          new Date()
        );

        continue;
      }

      const decision =
        await reminderDecisionService.shouldSendReminder({
          challenge,
          userId: challenge.userId,
        });

      // Fix #2: Close suppressed reminders
      if (!decision.shouldSend) {
        await reminderRepository.updateReminderStatus(
          reminder._id,
          REMINDER_STATUS.EXPIRED,
          new Date()
        );

        continue;
      }

      await notificationDispatcher.dispatchReminder(
        reminder
      );

     await reminderCoordinator.onReminderTriggered({
  reminder,
  challenge,
  decision,
});

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