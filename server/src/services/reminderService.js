import reminderRepository from "../repositories/reminderRepository.js";
import challengeRepository from "../repositories/challengeRepositories.js";
import {
  REMINDER_TYPES,
  REMINDER_STATUS,
} from "../constants/reminderConstants.js";
import reminderDecisionService from "./reminderDecisionServices.js";





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

const getChallengeReminders = async (challengeId , userId) => {
  const challenge =
  await challengeRepository
    .getChallengeById(
      challengeId
    );

if (!challenge) {
  throw new Error(
    "Challenge not found"
  );
}

if (
  challenge.userId.toString() !==
  userId
) {
  throw new Error(
    "Forbidden"
  );
}

return reminderRepository
  .getRemindersByChallenge(
    challengeId
  );
};

const getReminderStatus = async (
  challengeId,
  userId
) => {
  const challenge =
    await challengeRepository.getChallengeById(
      challengeId
    );

  if (!challenge) {
    throw new Error(
      "Challenge not found"
    );
  }

  if (
    challenge.userId.toString() !==
    userId
  ) {
    throw new Error(
      "Forbidden"
    );
  }

  const reminders =
    await reminderRepository.getRemindersByChallenge(
      challengeId
    );

  const pendingCount =
    reminders.filter(
      (reminder) =>
        reminder.status ===
        REMINDER_STATUS.PENDING
    ).length;

  const triggeredCount =
    reminders.filter(
      (reminder) =>
        reminder.status ===
        REMINDER_STATUS.TRIGGERED
    ).length;

  const expiredCount =
    reminders.filter(
      (reminder) =>
        reminder.status ===
        REMINDER_STATUS.EXPIRED
    ).length;

  const nextReminder =
    reminders.find(
      (reminder) =>
        reminder.status ===
        REMINDER_STATUS.PENDING
    ) || null;

  const lastReminder =
    [...reminders]
      .reverse()
      .find(
        (reminder) =>
          reminder.status ===
          REMINDER_STATUS.TRIGGERED
      ) || null;

  return {
    pendingCount,
    triggeredCount,
    expiredCount,
    nextReminder,
    lastReminder,
  };
};

const getReminderDecision = async (
  challengeId,
  userId
) => {
  const challenge =
    await challengeRepository.getChallengeById(
      challengeId
    );

  if (!challenge) {
    throw new Error(
      "Challenge not found"
    );
  }

  if (
    challenge.userId.toString() !==
    userId
  ) {
    throw new Error(
      "Forbidden"
    );
  }

  return reminderDecisionService.shouldSendReminder({
    challenge,
    userId,
  });
};

 export default {
  createReminderSchedule,
  createManyReminderSchedules,
  generateCheckpointReminder,
  updateReminderStatus,
  getChallengeReminders,
  getReminderStatus,
  getReminderDecision,
};