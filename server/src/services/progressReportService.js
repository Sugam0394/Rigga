import progressReportRepository from "../repositories/progressReportRepository.js";
import challengeRepository from "../repositories/challengeRepositories.js"




const submitProgressReport = async (
  reportData
) => {
  const {
  challengeId,
  notes,
  userId,
} = reportData;

  if (!challengeId || !notes) {
    throw new Error(
      "Challenge ID and notes are required"
    );
  }

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