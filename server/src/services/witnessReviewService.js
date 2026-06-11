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

const validateReviewEligibility = async (challengeId) => {

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
     challenge.witness.decision
   ) {
     throw new Error(
       "Review already submitted"
     );
   }

   return challenge;
};




 const approveChallenge = async (
  challengeId
) => {

   await validateReviewEligibility(
    challengeId
  );

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

    await validateReviewEligibility(
    challengeId
  );

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