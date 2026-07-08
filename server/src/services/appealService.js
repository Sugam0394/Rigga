 import appealRepository from "../repositories/appealRepository.js";

 import challengeRepository from "../repositories/challengeRepositories.js";

import { CHALLENGE_STATUS } from "../constants/challengeStatus.js";

 import witnessCoordinator
  from "./witnessCoordinator.js";

 
 
 

import witnessDecisionService
  from "./witnessDecisionService.js";

 

 

 
 const submitAppeal = async ({
  challengeId,
  userId,
  notes,
  imageUrl,
}) => {
  // -----------------------------
  // Fetch Runtime Data
  // -----------------------------

  const challenge =
    await challengeRepository.getChallengeById(
      challengeId
    );

  if (!challenge) {
    throw new Error(
      "Challenge not found"
    );
  }

  // -----------------------------
  // Authorization
  // -----------------------------

  if (
    challenge.userId.toString() !==
    userId
  ) {
    throw new Error(
      "Unauthorized appeal attempt"
    );
  }

  // -----------------------------
  // Trust Decision
  // -----------------------------

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

  // -----------------------------
  // Runtime Persistence
  // -----------------------------

  const appeal =
    await appealRepository.createAppeal({
      challengeId,
      notes,
      imageUrl,
    });

  const updatedChallenge =
    await challengeRepository.updateStatus(
      challengeId,
      CHALLENGE_STATUS.REJECTED,
      CHALLENGE_STATUS.APPEALED
    );

  // -----------------------------
  // Cross-engine Coordination
  // -----------------------------

  try {
    await witnessCoordinator.onAppealSubmitted({
      challenge: updatedChallenge,
      appeal,
    });
  } catch (error) {
    console.error(
      "[WITNESS COORDINATOR]",
      error
    );
  }

  // -----------------------------
  // Runtime Response
  // -----------------------------

  return appeal;
};

 
export default {
  submitAppeal,
};