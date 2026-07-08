import challengeRepository from "../repositories/challengeRepositories.js";
import { CHALLENGE_STATUS } from "../constants/challengeStatus.js";
import witnessCoordinator from "./witnessCoordinator.js";
import { NOTIFICATION_EVENTS, } from "../constants/notificationEvents.js";

 
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
    throw new Error(
      decision.reason
    );
  }

  // -----------------------------
  // Existing Runtime Execution
  // -----------------------------

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

  await witnessCoordinator.onReviewSubmitted({
  challenge: updatedChallenge,
  decision: "APPROVED",
});

return updatedChallenge;

   
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

  await challengeRepository
    .rejectChallenge({
      challengeId,
      rejectionReason,
    });

  if (isAppealed) {
    const failedChallenge =
      await challengeRepository
        .updateStatus(
          challengeId,
          CHALLENGE_STATUS.FAILED
        );

    await witnessCoordinator.onReviewSubmitted({
      challenge: failedChallenge,
      decision: "REJECTED",
      appealed: true,
    });

    return failedChallenge;
  }

  const updatedChallenge =
    await challengeRepository
      .updateStatus(
        challengeId,
        CHALLENGE_STATUS.REJECTED
      );

  await witnessCoordinator.onReviewSubmitted({
    challenge: updatedChallenge,
    decision: "REJECTED",
    appealed: false,
  });

  return updatedChallenge;
};

export default {
  approveChallenge,
  rejectChallenge,
};