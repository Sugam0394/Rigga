import cron from "node-cron";

import reminderEngineService from "../services/reminderEngineService.js";

const registerReminderJob =  () => {
    cron.schedule(
      "*/15 * * * *",
      async () => {
        await reminderEngineService
          .executePendingReminders();
      }
    );

    console.log(
      "[REMINDER JOB REGISTERED]"
    );
  };

export default registerReminderJob;