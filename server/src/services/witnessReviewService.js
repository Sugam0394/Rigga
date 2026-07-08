import challengeRepository from "../repositories/challengeRepositories.js";

import { CHALLENGE_STATUS } from "../constants/challengeStatus.js";

import consequenceReleaseService from "./consequenceReleaseService.js";
import notificationEventService from "./notificationEventService.js";
 

 import userNotificationService
  from "./userNotificationService.js";

import {
  NOTIFICATION_EVENTS,
} from "../constants/notificationEvents.js";

 
import witnessDecisionService from "./witnessDecisionService.js";
 

 
 const approveChallenge = async (
  challengeId
) => {

  const challenge =
    await challengeRepository.getChallengeById(
      challengeId
    );

  const decision =
    witnessDecisionService.evaluateWitnessDecision({
      action: "APPROVE_REVIEW",
      challenge,
    });

  if (!decision.allowed) {
    throw new Error(decision.reason);
  }

  // existing execution continues...
};

 const rejectChallenge = async ({
  challengeId,
  rejectionReason,
}) => {

  const existingChallenge =
    await challengeRepository.getChallengeById(
      challengeId
    );

  const decision =
    witnessDecisionService.evaluateWitnessDecision({
      action: "REJECT_REVIEW",
      challenge: existingChallenge,
      rejectionReason,
    });

  if (!decision.allowed) {
    throw new Error(decision.reason);
  }

  const isAppealed =
    existingChallenge.status ===
    CHALLENGE_STATUS.APPEALED;

  // existing execution continues...
};

export default {
  approveChallenge,
  rejectChallenge,
};