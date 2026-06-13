import reminderRepository from "../repositories/reminderRepository.js";

import notificationDispatcher from "./notificationDispatcher.js";

import {
  REMINDER_STATUS,
} from "../constants/reminderConstants.js";

const executePendingReminders = async () => {
    console.log(
      "[REMINDER JOB START]"
    );

    const reminders =
      await reminderRepository
        .getDuePendingReminders(
          new Date()
        );

    for (const reminder of reminders) {
  try {
    console.log(
      `[REMINDER FOUND] ${reminder._id}`
    );

    await notificationDispatcher
      .dispatchReminder(
        reminder
      );

    await reminderRepository
      .updateReminderStatus(
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