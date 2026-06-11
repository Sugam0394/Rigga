 import challengeRepository from "../repositories/challengeRepositories.js";

import {
  CHALLENGE_STATUS,
} from "../constants/challengeStatus.js";

const evaluateChallengeLifecycle = async (challenge) => {
    if (!challenge) {
      return null;
    }

    const now =
      new Date();
    if (
  challenge.status ===
    CHALLENGE_STATUS.ACTIVE &&
  challenge.deadlineAt &&
  challenge.deadlineAt < now
)  {
      return challengeRepository.updateStatus(
        challenge._id,
        CHALLENGE_STATUS.UNDER_REVIEW
      );
    }

    return challenge;
  };

export default {
  evaluateChallengeLifecycle,
};