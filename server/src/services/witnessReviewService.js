import challengeRepository from "../repositories/challengeRepositories.js";

import { CHALLENGE_STATUS } from "../constants/challengeStatus.js";

import consequenceReleaseService from "./consequenceReleaseService.js";

 

 import userNotificationService
  from "./userNotificationService.js";

import {
  NOTIFICATION_EVENTS,
} from "../constants/notificationEvents.js";

 

 

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
  challenge.status !==
    CHALLENGE_STATUS.UNDER_REVIEW &&
  challenge.status !==
    CHALLENGE_STATUS.APPEALED
) {
  throw new Error(
    "Challenge is not eligible for review"
  );
}

 if (
  challenge.witness.decision &&
  challenge.status !==
    CHALLENGE_STATUS.APPEALED
) {
  throw new Error(
    "Review already submitted"
  );
}
 return challenge;
}


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

const updatedChallenge =
  await challengeRepository
    .updateStatus(
      challengeId,
      CHALLENGE_STATUS.COMPLETED
    );

await userNotificationService
  .createEventNotification({
    userId:
      updatedChallenge.userId,

    type:
      NOTIFICATION_EVENTS
        .CHALLENGE_APPROVED,

    entityType:
      "CHALLENGE",

    entityId:
      updatedChallenge._id,
  });

return updatedChallenge;

  
};

 const rejectChallenge = async ({
  challengeId,
  rejectionReason,
}) => {

   

  validateRejectionReason(
    rejectionReason
  );

 const existingChallenge =
  await validateReviewEligibility(
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

    const failedChallenge =
  await challengeRepository
    .updateStatus(
      challengeId,
      CHALLENGE_STATUS.FAILED
    );

await userNotificationService
  .createEventNotification({
    userId:
      failedChallenge.userId,

    type:
      NOTIFICATION_EVENTS
        .CHALLENGE_FAILED,

    entityType:
      "CHALLENGE",

    entityId:
      failedChallenge._id,
  });

return failedChallenge;
  }

   const updatedChallenge =
  await challengeRepository
    .updateStatus(
      challengeId,
      CHALLENGE_STATUS.REJECTED
    );

await userNotificationService
  .createEventNotification({
    userId:
      updatedChallenge.userId,

    type:
      NOTIFICATION_EVENTS
        .CHALLENGE_REJECTED,

    entityType:
      "CHALLENGE",

    entityId:
      updatedChallenge._id,
  });

return updatedChallenge;
};

export default {
  approveChallenge,
  rejectChallenge,
};