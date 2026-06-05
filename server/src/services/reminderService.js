import reminderRepository from "../repositories/reminderRepository.js";
import {
  REMINDER_TYPES,
  REMINDER_STATUS,
} from "../constants/reminderConstants.js";

const createReminderSchedule = async (reminderData) => {
  return reminderRepository.createReminder(reminderData);
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

 

const getChallengeReminders = async (challengeId) => {
  return reminderRepository.getRemindersByChallenge(challengeId);
};

export default {
  createReminderSchedule,
  generateCheckpointReminder,

  getChallengeReminders,
};