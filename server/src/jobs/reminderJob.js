import cron from "node-cron";

import reminderEngineService from "../services/reminderEngineService.js";

const registerReminderJob =  () => {
    cron.schedule(
  "*/15 * * * *",
  async () => {
    try {
      await reminderEngineService
        .executePendingReminders();
    } catch (error) {
      console.error(
        "[REMINDER JOB FATAL ERROR]",
        error
      );
    }
  }
);

    console.log(
      "[REMINDER JOB REGISTERED]"
    );
  };

export default registerReminderJob;