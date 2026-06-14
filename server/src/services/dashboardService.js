import challengeRepository from "../repositories/challengeRepositories.js";
import progressReportRepository from "../repositories/progressReportRepository.js"
import checkpointRepository from "../repositories/checkPointRepository.js";
import reminderRepository from "../repositories/reminderRepository.js";
import consequenceRepository from "../repositories/consequenceRepository.js";
import lifecycleService from "./lifecycleService.js";




const getChallengeDashboard = async (challengeId , userId) => {

   let challenge =
  await challengeRepository.getChallengeById(
    challengeId
  );

challenge =
  await lifecycleService.evaluateChallengeLifecycle(
    challenge
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

     const reports =
  await progressReportRepository
    .getByChallengeId(challengeId);

 

    const checkpoints =
  await checkpointRepository
    .getByChallengeId(
      challengeId
    );

  const reminders =
  await reminderRepository
    .getRemindersByChallenge(
      challengeId
    );

const consequence =
  await consequenceRepository
    .getByChallengeId(
      challengeId
    );

    return {
      challenge: {
        title:
          challenge.title,

        deadlineAt:
          challenge.deadlineAt,

        status:
          challenge.status,
      },

    witness: {
  name:
    challenge.witness?.name,

  phone:
    challenge.witness?.phone,

  decision:
    challenge.witness?.decision,

  reviewToken:
    challenge.witness?.reviewToken,
},

     progress: {
  totalReports:
    reports.length,
    
 latestReportDate:
  reports.length > 0
    ? reports[
        reports.length - 1
      ].createdAt
    : null
},

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
    consequence
      ?.isLocked ?? false,

  isReleased:
    consequence
      ?.isReleased ?? false,
},
    };
  };

export default {
  getChallengeDashboard,
};