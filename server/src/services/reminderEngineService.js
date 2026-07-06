 import reminderRepository from "../repositories/reminderRepository.js";
import reminderDecisionService from "./reminderDecisionServices.js";
import reminderCoordinator from "./reminderCoordinator.js";

import challengeRepository from "../repositories/challengeRepositories.js";
import REMINDER_OUTCOMES from "../constants/reminderOutcomeConstants.js";
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

      // Challenge deleted
      if (!challenge) {
        await reminderRepository.updateReminderOutcome(
          reminder._id,
          {
            status:
              REMINDER_STATUS.EXPIRED,

            triggeredAt:
              new Date(),

            outcome:
              REMINDER_OUTCOMES.EXPIRED,

            reason:
              "CHALLENGE_NOT_FOUND",

            urgency:
              "NONE",

            tone:
              "NONE",

            observationMode:
              null,
          }
        );

        continue;
      }

      const decision =
        await reminderDecisionService.shouldSendReminder({
          challenge,
          userId:
            challenge.userId,
        });

      // Reminder suppressed
      if (!decision.shouldSend) {
        await reminderRepository.updateReminderOutcome(
          reminder._id,
          {
            status:
              REMINDER_STATUS.EXPIRED,

            triggeredAt:
              new Date(),

             outcome:
  REMINDER_OUTCOMES.SUPPRESSED,

            reason:
              decision.reason,

            urgency:
              decision.urgency,

            tone:
              decision.tone,

            observationMode:
              decision.observationMode,
          }
        );

        continue;
      }

      await reminderCoordinator.onReminderTriggered({
        reminder,
        challenge,
        decision,
      });

      await reminderRepository.updateReminderOutcome(
        reminder._id,
        {
          status:
            REMINDER_STATUS.TRIGGERED,

          triggeredAt:
            new Date(),

          outcome:
            REMINDER_OUTCOMES.TRIGGERED,

          reason:
            decision.reason,

          urgency:
            decision.urgency,

          tone:
            decision.tone,

          observationMode:
            decision.observationMode,
        }
      );

      console.log(
        `[REMINDER COMPLETED] ${reminder._id}`
      );

    } catch (error) {
      console.error(
        `[REMINDER ERROR] ${reminder._id}`,
        error
      );

      try {
        await reminderRepository.updateReminderOutcome(
          reminder._id,
          {
            status:
              REMINDER_STATUS.EXPIRED,

            triggeredAt:
              new Date(),

            outcome:
              REMINDER_OUTCOMES.FAILED,

            reason:
              error.message,

            urgency:
              null,

            tone:
              null,

            observationMode:
              null,
          }
        );
      } catch (outcomeError) {
        console.error(
          "[REMINDER OUTCOME ERROR]",
          outcomeError
        );
      }
    }
  }
};

export default {
  executePendingReminders,
};