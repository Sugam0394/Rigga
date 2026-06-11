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

export default {
  createProgressReport,
  getByChallengeId,
};