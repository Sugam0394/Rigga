import "./config/env.js";
import app from './app.js'
import connectDB from './config/db.js'

import registerReminderJob  from "./jobs/reminderJob.js";

import registerLifecycleJob from "./jobs/lifecycleJob.js";

 connectDB()
  .then(() => {

    registerReminderJob();

    registerLifecycleJob();

    app.listen(
      process.env.PORT || 3000,
      () => {
        console.log(
          `Server is running at PORT : ${process.env.PORT}`
        );
      }
    );
  })