import { Reminder } from "../models/reminderModel.js";
import { REMINDER_STATUS } from "../constants/reminderConstants.js";



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

const getDuePendingReminders =  async (currentTime) => {
    return Reminder.find({
      status:
        REMINDER_STATUS.PENDING,

      scheduledAt: {
        $lte: currentTime,
      },
    });
  };

export default {
  createReminder,
  createManyReminders,
  getRemindersByChallenge,
  updateReminderStatus,
  getDuePendingReminders
};