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

const getChallengeTimeline = async (
  challengeId
) => {
  return await ProgressReport.find({
    challengeId,
  }).sort({
    createdAt: 1,
  });
};

const getReportsInOrder = async (
  challengeId
) => {
  return await ProgressReport.find({
    challengeId,
  }).sort({
    createdAt: 1,
  });
};

const getLatestReport = async (
  challengeId
) => {
  return await ProgressReport.findOne({
    challengeId,
  }).sort({
    createdAt: -1,
  });
};

const getReportsForObservationWindow = async ({
  challengeId,
  userId,
  observationWindow,
  startOfDay,
  endOfDay,
}) => {
  switch (observationWindow) {
    case "DAY":
      return ProgressReport.find({
        challengeId,
        userId,
        createdAt: {
          $gte: startOfDay,
          $lte: endOfDay,
        },
      });

    case "COMPLETION":
      return ProgressReport.find({
        challengeId,
        userId,
      });

    case "CHECKPOINT":
      // P4.4 placeholder
      // Until checkpoint windows are implemented,
      // use the current observation window.
      return ProgressReport.find({
        challengeId,
        userId,
        createdAt: {
          $gte: startOfDay,
          $lte: endOfDay,
        },
      });

    default:
      throw new Error(
        "Unsupported observation window"
      );
  }
};

export default {
  createProgressReport,
  getByChallengeId,
  getReportsSubmittedToday,
  findDuplicateReportToday,
  getChallengeTimeline,
  getReportsInOrder,
  getLatestReport,
  getReportsForObservationWindow,
};