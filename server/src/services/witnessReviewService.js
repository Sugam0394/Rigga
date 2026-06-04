import challengeRepository from "../repositories/challengeRepositories.js";

import { CHALLENGE_STATUS } from "../constants/challengeStatus.js";

import consequenceReleaseService from "./consequenceReleaseService.js";


const validateRejectionReason = (
  rejectionReason
) => {

  if (!rejectionReason) {
    throw new Error(
      "Rejection reason is required"
    );
  }

  const wordCount =
    rejectionReason
      .trim()
      .split(/\s+/).length;

  if (wordCount < 30) {
    throw new Error(
      "Rejection reason must contain at least 30 words"
    );
  }

  if (wordCount > 200) {
    throw new Error(
      "Rejection reason cannot exceed 200 words"
    );
  }
};




 const approveChallenge = async (
  challengeId
) => {

 

  await challengeRepository
  .approveChallenge(
    challengeId
  );

return challengeRepository
  .updateStatus(
    challengeId,
    CHALLENGE_STATUS.COMPLETED
  );

  
};

 const rejectChallenge = async ({
  challengeId,
  rejectionReason,
}) => {

  validateRejectionReason(
    rejectionReason
  );

  const existingChallenge =
    await challengeRepository
      .getChallengeById(
        challengeId
      );

  const isAppealed =
    existingChallenge.status ===
    CHALLENGE_STATUS.APPEALED;

  await challengeRepository
    .rejectChallenge({
      challengeId,
      rejectionReason,
    });

  if (isAppealed) {

    await consequenceReleaseService
      .releaseConsequence(
        challengeId
      );

    return challengeRepository
      .updateStatus(
        challengeId,
        CHALLENGE_STATUS.FAILED
      );
  }

  return challengeRepository
    .updateStatus(
      challengeId,
      CHALLENGE_STATUS.REJECTED
    );
};

export default {
  approveChallenge,
  rejectChallenge,
};