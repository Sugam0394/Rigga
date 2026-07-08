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
  const challenge =
    await challengeRepository.getChallengeById(
      challengeId
    );

  if (!challenge) {
    throw new Error(
      "Challenge not found"
    );
  }

  // Authorization stays in runtime
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
      CHALLENGE_STATUS.APPEALED
    );

  // -----------------------------
  // Cross-engine orchestration
  // -----------------------------

  await witnessCoordinator.onAppealSubmitted({
    challenge: updatedChallenge,
    appeal,
  });

  return appeal;
};

 
export default {
  submitAppeal,
};