import reminderRepository from "../repositories/reminderRepository.js";
import {
  REMINDER_TYPES,
  REMINDER_STATUS,
} from "../constants/reminderConstants.js";

const createReminderSchedule = async (reminderData) => {
  return reminderRepository.createReminder(reminderData);
};

const createManyReminderSchedules = async (reminders) => {
  return reminderRepository.createManyReminders(
    reminders
  );
};

const generateCheckpointReminder = async ({
  challengeId,
  checkpointId,
  scheduledAt,
}) => {
  return reminderRepository.createReminder({
    challengeId,
    checkpointId,
    type: REMINDER_TYPES.CHECKPOINT_REMINDER,
    scheduledAt,
    status: REMINDER_STATUS.PENDING,
  });
};

 const updateReminderStatus = async (
  reminderId,
  status,
  triggeredAt = null
) => {
  return reminderRepository
    .updateReminderStatus(
      reminderId,
      status,
      triggeredAt
    );
};

const getChallengeReminders = async (challengeId) => {
  return reminderRepository.getRemindersByChallenge(challengeId);
};

export default {
  createReminderSchedule,
  createManyReminderSchedules,
  generateCheckpointReminder,
  updateReminderStatus,
  getChallengeReminders,
};