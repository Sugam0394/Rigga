import { Reminder } from "../models/reminderModel.js";

const createReminder = async (data) => {
  return Reminder.create(data);
};

const createManyReminders = async (reminders) => {
  return Reminder.insertMany(reminders);
};

const getRemindersByChallenge = async (challengeId) => {
  return Reminder.find({ challengeId }).sort({
    scheduledAt: 1,
  });
};

 const updateReminderStatus = async (
  reminderId,
  status,
  triggeredAt = null
) => {
  return Reminder.findByIdAndUpdate(
    reminderId,
    {
      $set: {
        status,
        triggeredAt,
      },
    },
    {
      new: true,
    }
  );
};

export default {
  createReminder,
  createManyReminders,
  getRemindersByChallenge,
  updateReminderStatus,
};