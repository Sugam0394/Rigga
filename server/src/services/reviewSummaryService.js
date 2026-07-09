 import accountabilityAggregateService from "./accountabilityAggregateService.js";
import challengeRepository from "../repositories/challengeRepositories.js";



const getReviewSummary = async (challengeId , userId = null) => {
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
  userId &&
  challenge.userId.toString() !==
    userId
) {
  throw new Error(
    "Forbidden"
  );
}

 const {
  progressReports,
  checkpoints,
  appeal,
  consequence,
} =
await  accountabilityAggregateService
  .getAccountabilityContext(
    challengeId
  );

  const completed = checkpoints.filter(
  (checkpoint) => checkpoint.status === CHECKPOINT_STATUS.COMPLETED
).length;

const missed = checkpoints.filter(
  (checkpoint) => checkpoint.status === CHECKPOINT_STATUS.MISSED
).length;

const pending = checkpoints.filter(
  (checkpoint) => checkpoint.status === CHECKPOINT_STATUS.PENDING
).length;

  const summary = {
    challenge: {
     title: challenge.title || null,
deadlineAt: challenge.deadlineAt || null,
successCriteria: challenge.successCriteria || null,
status: challenge.status || null,
    },

    witness: challenge.witness
      ? {
          name: challenge.witness.name,
          phone: challenge.witness.phone,
          decision: challenge.witness.decision,
          rejectionReason: challenge.witness.rejectionReason,
          decidedAt: challenge.witness.decidedAt,
        }
      : null,

    checkpoints: {
      total: checkpoints.length,
      completed,
      missed,
      pending,
    },

    progressReports: {
      count: progressReports.length,

      reports: progressReports.map((report) => ({
        id: report._id.toString(),
        notes: report.notes,
        imageUrl: report.imageUrl,
        submittedAt: report.submittedAt,
      })),
    },

    appeal: {
      exists: !!appeal,

      details: appeal
        ? {
            id: appeal._id.toString(),
            notes: appeal.notes,
            status: appeal.status,
            submittedAt: appeal.submittedAt,
            reviewedAt: appeal.reviewedAt,
          }
        : null,
    },

    consequence: consequence
      ? {
          isLocked: consequence.isLocked,
          isReleased: consequence.isReleased,
          releasedAt: consequence.releasedAt,
        }
      : {
          isLocked: false,
          isReleased: false,
          releasedAt: null,
        },
  };

  return summary;
};

export default {
  getReviewSummary,
};
 