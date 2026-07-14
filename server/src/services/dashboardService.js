import challengeRepository from "../repositories/challengeRepositories.js";
import progressReportRepository from "../repositories/progressReportRepository.js"
import checkpointRepository from "../repositories/checkPointRepository.js";
import reminderRepository from "../repositories/reminderRepository.js";
import consequenceRepository from "../repositories/consequenceRepository.js";
import witnessService from "./witnessService.js";
import accountabilityAggregateService from "./accountabilityAggregateService.js";
import accountabilityPlanService from "./accountabilityPlanService.js";



const getChallengeDashboard = async (challengeId , userId) => {

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
    "Unauthorized access"
  );
}
const durationDays =
  Math.floor(
    (
      new Date(
        challenge.deadlineAt
      ).getTime() -
      new Date(
        challenge.createdAt
      ).getTime()
    ) /
    (1000 * 60 * 60 * 24)
  ) + 1;

const accountabilityPlan =
  accountabilityPlanService
    .generateAccountabilityPlan({
      title:
        challenge.title,

      successCriteria:
        challenge.successCriteria,

      durationDays,
    });
  

 

 

  const reminders =
  await reminderRepository
    .getRemindersByChallenge(
      challengeId
    );

    const {
  progressReports,
  checkpoints,
  consequence,
} =
await accountabilityAggregateService
  .getAccountabilityContext(
    challengeId
  );
  
  
    const witnessStatus =
  await witnessService.getWitnessStatus({
    challengeId,
    userId,
  });
 

     return {
    challenge: {
      title:
        challenge.title,

      category:
        challenge.category,

      deadlineAt:
        challenge.deadlineAt,

      status:
        challenge.status,
    },

     accountabilityPlan,
 
    witness: {
    name: witnessStatus.witness?.name,
    phone: witnessStatus.witness?.phone,
    decision: witnessStatus.decision,
  },

    progress: {
      totalReports:
        progressReports.length,

      latestReportDate:
        progressReports.length > 0
          ? progressReports[
              progressReports.length -
                1
            ].createdAt
          : null,
    },

      // 👇 ADD THIS
      progressReports,

    checkpoints: {
      total:
        checkpoints.length,

      completed:
        checkpoints.filter(
          (checkpoint) =>
            checkpoint.status ===
            "COMPLETED"
        ).length,

      pending:
        checkpoints.filter(
          (checkpoint) =>
            checkpoint.status ===
            "PENDING"
        ).length,

      missed:
        checkpoints.filter(
          (checkpoint) =>
            checkpoint.status ===
            "MISSED"
        ).length,
    },

    reminders: {
      total:
        reminders.length,

      pending:
        reminders.filter(
          (reminder) =>
            reminder.status ===
            "PENDING"
        ).length,

      triggered:
        reminders.filter(
          (reminder) =>
            reminder.status ===
            "TRIGGERED"
        ).length,
    },

    consequence: {
      isLocked:
        consequence?.isLocked ??
        false,

      isReleased:
        consequence?.isReleased ??
        false,
    },
  };
};

export default {
  getChallengeDashboard,
};