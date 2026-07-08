 import appealRepository from "../repositories/appealRepository.js";

 import challengeRepository from "../repositories/challengeRepositories.js";

import { CHALLENGE_STATUS } from "../constants/challengeStatus.js";

import userNotificationService
  from "./userNotificationService.js";

import {
  NOTIFICATION_EVENTS,
} from "../constants/notificationEvents.js";
 
import notificationEventService from "./notificationEventService.js"

import witnessDecisionService
  from "./witnessDecisionService.js";

 

 

 

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

  const challenge =
    await challengeRepository.getChallengeById(
      challengeId
    );

  if (!challenge) {
    throw new Error(
      "Challenge not found"
    );
  }

  // Authorization Runtime Responsibility
  if (
    challenge.userId.toString() !==
    userId
  ) {
    throw new Error(
      "Unauthorized appeal attempt"
    );
  }

  const existingAppeal =
    await appealRepository.getByChallengeId(
      challengeId
    );

  const decision =
    witnessDecisionService.evaluateWitnessDecision({
      action: "SUBMIT_APPEAL",
      challenge,
      appeal: existingAppeal,
      notes,
    });

  if (!decision.allowed) {
    throw new Error(
      decision.reason
    );
  }

  const appeal =
    await appealRepository.createAppeal({
      challengeId,
      notes,
      imageUrl,
    });

  const updatedChallenge =
    await challengeRepository.updateStatus(
      challengeId,
      CHALLENGE_STATUS.APPEALED
    );

  const notificationEvent =
    notificationEventService.createNotificationEvent({
      eventType:
        NOTIFICATION_EVENTS.APPEAL_SUBMITTED,

      sourceEngine: "APPEAL",

      userId:
        updatedChallenge.userId,

      entityType:
        "CHALLENGE",

      entityId:
        updatedChallenge._id,

      payload: {
        status:
          CHALLENGE_STATUS.APPEALED,

        appealId:
          appeal._id,
      },
    });

  await userNotificationService
    .createEventNotification(
      notificationEvent
    );

  return appeal;
};

 
export default {
  submitAppeal,
};