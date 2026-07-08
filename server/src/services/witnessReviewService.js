import challengeRepository from "../repositories/challengeRepositories.js";
import { CHALLENGE_STATUS } from "../constants/challengeStatus.js";
import witnessCoordinator from "./witnessCoordinator.js";
import { NOTIFICATION_EVENTS, } from "../constants/notificationEvents.js";

 
import witnessDecisionService from "./witnessDecisionService.js";
 

 
 const approveChallenge = async (
  challengeId
) => {
  // -----------------------------
  // Fetch Runtime Data
  // -----------------------------

  const challenge =
    await challengeRepository.getChallengeById(
      challengeId
    );

  // -----------------------------
  // Trust Decision
  // -----------------------------

  const decision =
    witnessDecisionService.evaluateWitnessDecision({
      action: "APPROVE_REVIEW",
      challenge,
    });

  if (!decision.allowed) {
    throw new Error(
      decision.reason
    );
  }

  // -----------------------------
  // Runtime Persistence
  // -----------------------------

  await challengeRepository.approveChallenge(
    challengeId
  );

  const updatedChallenge =
    await challengeRepository.updateStatus(
      challengeId,
      CHALLENGE_STATUS.UNDER_REVIEW,
      CHALLENGE_STATUS.COMPLETED
    );

  // -----------------------------
  // Cross-engine Coordination
  // -----------------------------

  try {
    await witnessCoordinator.onReviewSubmitted({
      challenge: updatedChallenge,
      decision: "APPROVED",
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

  return updatedChallenge;
};

 const rejectChallenge = async ({
  challengeId,
  rejectionReason,
}) => {
  // -----------------------------
  // Fetch Runtime Data
  // -----------------------------

  const existingChallenge =
    await challengeRepository.getChallengeById(
      challengeId
    );

  // -----------------------------
  // Trust Decision
  // -----------------------------

  const decision =
    witnessDecisionService.evaluateWitnessDecision({
      action: "REJECT_REVIEW",
      challenge: existingChallenge,
      witness: {
        rejectionReason,
      },
    });

  if (!decision.allowed) {
    throw new Error(
      decision.reason
    );
  }

  const isAppealed =
    existingChallenge.status ===
    CHALLENGE_STATUS.APPEALED;

  // -----------------------------
  // Runtime Persistence
  // -----------------------------

  await challengeRepository.rejectChallenge({
    challengeId,
    rejectionReason,
  });

  if (isAppealed) {
    const failedChallenge =
      await challengeRepository.updateStatus(
        challengeId,
        CHALLENGE_STATUS.APPEALED,
        CHALLENGE_STATUS.FAILED
      );

    try {
      await witnessCoordinator.onReviewSubmitted({
        challenge: failedChallenge,
        decision: "REJECTED",
        appealed: true,
      });
    } catch (error) {
      console.error(
        "[WITNESS COORDINATOR]",
        error
      );
    }

    return failedChallenge;
  }

  const updatedChallenge =
    await challengeRepository.updateStatus(
      challengeId,
      CHALLENGE_STATUS.UNDER_REVIEW,
      CHALLENGE_STATUS.REJECTED
    );

  try {
    await witnessCoordinator.onReviewSubmitted({
      challenge: updatedChallenge,
      decision: "REJECTED",
      appealed: false,
    });
  } catch (error) {
    console.error(
      "[WITNESS COORDINATOR]",
      error
    );
  }

  return updatedChallenge;
};

export default {
  approveChallenge,
  rejectChallenge,
};