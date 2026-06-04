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

  const challenge =
  await challengeRepository
    .approveChallenge(
      challengeId
    );

await challengeRepository
  .updateStatus(
    challengeId,
    CHALLENGE_STATUS.COMPLETED
  );

return challenge;
};

 const rejectChallenge = async ({
  challengeId,
  rejectionReason,
}) => {

  validateRejectionReason(
    rejectionReason
  );

  const challenge =
  await challengeRepository
    .rejectChallenge({
      challengeId,
      rejectionReason,
    });


    const existingChallenge =
  await challengeRepository
    .getChallengeById(
      challengeId
    );
 
 

return challenge;
};

export default {
  approveChallenge,
  rejectChallenge,
};