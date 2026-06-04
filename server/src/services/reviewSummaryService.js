 import Challenge from "../models/challengeModel.js";
import ProgressReport from "../models/progressReportModel.js";
import checkPointModel from "../models/checkPointModel.js";
import Appeal from "../models/appealModel.js";
import Consequence from "../models/consequenceModel.js";

const getReviewSummary = async (challengeId) => {
  const challenge = await Challenge.findById(challengeId);

  if (!challenge) {
    throw new Error("Challenge not found");
  }

  const progressReports = await ProgressReport.find({
    challengeId,
  }).sort({
    submittedAt: -1,
  });

  const checkpoints = await checkPointModel.find({
    challengeId,
  });

  const appeal = await Appeal.findOne({
    challengeId,
  });

  const consequence = await Consequence.findOne({
    challengeId,
  });

  const completed = checkpoints.filter(
    (checkpoint) => checkpoint.status === "completed"
  ).length;

  const missed = checkpoints.filter(
    (checkpoint) => checkpoint.status === "missed"
  ).length;

  const pending = checkpoints.filter(
    (checkpoint) => checkpoint.status === "pending"
  ).length;

  const summary = {
    challenge: {
     title: challenge.title || null,
deadline: challenge.deadline || null,
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
            reason: appeal.reason,
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
 