 import challengeRepository from "../repositories/challengeRepositories.js";
import reviewLinkGeneratorService from "./reviewLinkService.js"
import {CHALLENGE_STATUS} from "../constants/challengeStatus.js";
import lifecycleCoordinator from "./lifecycleCoordinator.js";


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
     
  await reviewLinkGeneratorService.generateReviewLink(
    challenge._id
  );

 const updatedChallenge =
  await challengeRepository.updateStatus(
    challenge._id,
    CHALLENGE_STATUS.ACTIVE,
    CHALLENGE_STATUS.UNDER_REVIEW
  );

if (!updatedChallenge) {
  return challenge;
}

 await lifecycleCoordinator
  .onChallengeUnderReview(
    updatedChallenge
  );

return updatedChallenge;
    }

    return challenge;
  };

export default {
  evaluateChallengeLifecycle,
};