import consequenceRepository
  from "../repositories/consequenceRepository.js";

const releaseConsequence = async (
  challengeId
) => {

  const consequence =
    await consequenceRepository
      .getByChallengeId(
        challengeId
      );

  if (!consequence) {
    throw new Error(
      "Consequence not found"
    );
  }

  return consequenceRepository
    .releaseConsequence(
      challengeId
    );
};

export default {
  releaseConsequence,
};