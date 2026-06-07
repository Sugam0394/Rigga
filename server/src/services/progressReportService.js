import progressReportRepository from "../repositories/progressReportRepository.js";

const submitProgressReport = async (
  reportData
) => {
  const {
    challengeId,
    notes,
  } = reportData;

  if (!challengeId || !notes) {
    throw new Error(
      "Challenge ID and notes are required"
    );
  }

  return await progressReportRepository.createProgressReport({
  challengeId,
  notes,
  imageUrl:
    reportData.imageUrl ??
    null,
});
};

export default {
  submitProgressReport,
};