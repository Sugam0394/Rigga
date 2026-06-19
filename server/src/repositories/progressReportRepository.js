import ProgressReport from "../models/progressReportModel.js";

const createProgressReport = async (
  reportData
) => {
  return await ProgressReport.create(
    reportData
  );
};

 const getByChallengeId = async (
  challengeId
) => {
  return await ProgressReport.find({
    challengeId,
  }).sort({
    createdAt: -1,
  });
};

const getReportsSubmittedToday = async ({
  challengeId,
  userId,
  startOfDay,
  endOfDay,
}) => {
  return await ProgressReport.find({
    challengeId,
    userId,
    createdAt: {
      $gte: startOfDay,
      $lte: endOfDay,
    },
  });
};

const findDuplicateReportToday = async ({
  challengeId,
  userId,
  notes,
  imageUrl,
  startOfDay,
  endOfDay,
}) => {
  return await ProgressReport.findOne({
    challengeId,
    userId,
    notes,
    imageUrl,
    createdAt: {
      $gte: startOfDay,
      $lte: endOfDay,
    },
  });
};

export default {
  createProgressReport,
  getByChallengeId,
  getReportsSubmittedToday,
  findDuplicateReportToday
};