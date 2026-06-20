import challengeRepository from "../repositories/challengeRepositories.js";
import progressReportRepository from "../repositories/progressReportRepository.js";
import checkpointRepository from "../repositories/checkPointRepository.js";
import appealRepository from "../repositories/appealRepository.js";
import consequenceRepository from "../repositories/consequenceRepository.js";

const getAccountabilityContext = async (
  challengeId
) => {
const challenge =
  await challengeRepository
    .getChallengeById(
      challengeId
    );

const progressReports =
  await progressReportRepository
    .getByChallengeId(
      challengeId
    );

const checkpoints =
  await checkpointRepository
    .getByChallengeId(
      challengeId
    );

const appeal =
  await appealRepository
    .getByChallengeId(
      challengeId
    );

const consequence =
  await consequenceRepository
    .getByChallengeId(
      challengeId
    );

    return {
  challenge,
  progressReports,
  checkpoints,
  appeal,
  consequence,
};
};

export default {
  getAccountabilityContext,
};