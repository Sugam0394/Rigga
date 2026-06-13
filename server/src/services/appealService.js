 import appealRepository from "../repositories/appealRepository.js";

 import challengeRepository from "../repositories/challengeRepositories.js";

import { CHALLENGE_STATUS } from "../constants/challengeStatus.js";

import userNotificationService
  from "./userNotificationService.js";

import {
  NOTIFICATION_EVENTS,
} from "../constants/notificationEvents.js";
 

 const validateAppealNotes = (
  notes
) => {

  if (!notes) {
    throw new Error(
      "Appeal notes are required"
    );
  }
 const trimmedNotes =
  notes.trim();

if (
  trimmedNotes.length < 50
) {
  throw new Error(
    "Appeal explanation must be at least 50 characters"
  );
}

if (
  trimmedNotes.length > 1000
) {
  throw new Error(
    "Appeal explanation cannot exceed 1000 characters"
  );
}
};

const validateAppealEligibility = (
  challenge
) => {

  if (
    challenge?.witness
      ?.decision !==
    "REJECTED"
  ) {
    throw new Error(
      "Appeal is only allowed for rejected challenges"
    );
  }
};

const validateSingleAppealRule = (
  existingAppeal
) => {

  if (existingAppeal) {
    throw new Error(
      "This challenge has already been appealed"
    );
  }
};

const validateAppealWindow = (
  decidedAt
) => {

  const appealDeadline =
    new Date(decidedAt);

  appealDeadline.setHours(
    appealDeadline.getHours() + 6
  );

  if (
    new Date() >
    appealDeadline
  ) {
    throw new Error(
      "Appeal window has expired"
    );
  }
};



 const submitAppeal = async ({
  challengeId,
  userId,
  notes,
  imageUrl,
}) => {

  validateAppealNotes(
    notes
  );

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
    "Unauthorized appeal attempt"
  );
}

  validateAppealEligibility(
    challenge
  );

  validateAppealWindow(
    challenge.witness.decidedAt
  );

  const existingAppeal =
    await appealRepository
      .getByChallengeId(
        challengeId
      );

  validateSingleAppealRule(
    existingAppeal
  );

  const appeal =
  await appealRepository
    .createAppeal({
      challengeId,
      notes,
      imageUrl,
    });

 const updatedChallenge =
  await challengeRepository
    .updateStatus(
      challengeId,
      CHALLENGE_STATUS.APPEALED
    );

await userNotificationService
  .createEventNotification({
    userId:
      updatedChallenge.userId,

    type:
      NOTIFICATION_EVENTS
        .APPEAL_SUBMITTED,

    entityType:
      "CHALLENGE",

    entityId:
      updatedChallenge._id,
  });

return appeal;


};

export default {
  submitAppeal,
};