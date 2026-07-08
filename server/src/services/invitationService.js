import mongoose from "mongoose";


import invitationRepository from "../repositories/invitationRepository.js";
import reviewTokenService from "./reviewTokenService.js";
import challengeRepository from "../repositories/challengeRepositories.js";
import userRepository from "../repositories/userRepository.js";
import lifecycleCoordinator from "./lifecycleCoordinator.js";
import witnessCoordinator from "./witnessCoordinator.js";
import witnessDecisionService from "./witnessDecisionService.js";
 

const createInvitation = async ({ challengeId }) => {
  // Check if an active invitation already exists
  const activeInvitation =
    await invitationRepository.getActiveInvitationByChallengeId(
      challengeId
    );

  // Invalidate previous active invitation
  if (activeInvitation) {
    await invitationRepository.invalidateInvitation(
      activeInvitation._id
    );
  }

  // Generate new invitation
  const token =
    reviewTokenService.generateReviewToken();

  const expiresAt =
    reviewTokenService.generateReviewTokenExpiry();

  // Create new active invitation
  const invitation =
    await invitationRepository.createInvitation({
      challengeId,
      token,
      expiresAt,
      status: "ACTIVE",
    });

  return invitation;
};

 const regenerateInvitation = async ({
  challengeId,
  userId,
}) => {
  const challenge =
    await challengeRepository.getChallengeById(
      challengeId
    );

  if (!challenge) {
    throw new Error(
      "Challenge not found."
    );
  }

  if (
    challenge.userId.toString() !==
    userId
  ) {
    throw new Error(
      "You are not authorized to regenerate this invitation."
    );
  }

  if (
    challenge.status !==
    "PENDING_WITNESS"
  ) {
    throw new Error(
      "Invitation can only be regenerated while the challenge is waiting for a witness."
    );
  }

  return createInvitation({
    challengeId,
  });
};
 

 const acceptInvitation = async ({
  token,
  witness,
}) => {
  // -----------------------------
  // Fetch Runtime Data
  // -----------------------------

  const invitation =
    await invitationRepository.getInvitationByToken(
      token
    );

  const challenge = invitation
    ? await challengeRepository.getChallengeById(
        invitation.challengeId
      )
    : null;

  // -----------------------------
  // Trust Decision
  // -----------------------------

  const decision =
    witnessDecisionService.evaluateWitnessDecision({
      action: "ACCEPT_INVITATION",
      invitation,
      challenge,
      witness,
    });

  if (!decision.allowed) {
    throw new Error(decision.reason);
  }

  // -----------------------------
  // Atomic Acceptance
  // -----------------------------

  const session =
    await mongoose.startSession();

  try {
    session.startTransaction();

    const claimedInvitation =
      await invitationRepository.claimActiveInvitation(
        token,
        session
      );

    if (!claimedInvitation) {
      throw new Error(
        "Invitation already accepted."
      );
    }

    await challengeRepository.attachWitness({
      challengeId: challenge._id,
      witness,
      session,
    });

    const activeChallenge =
      await challengeRepository.activateChallenge(
        challenge._id,
        session
      );

    await session.commitTransaction();

   await witnessCoordinator.onInvitationAccepted({
  challenge: activeChallenge,
});

    return {
      success: true,
      challengeId: challenge._id,
    };
  } catch (error) {
    await session.abortTransaction();
    throw error;
  } finally {
    await session.endSession();
  }
};

 const getInvitationDetails = async (token) => {
  const invitation =
    await invitationRepository.getInvitationByToken(
      token
    );

  if (!invitation) {
    throw new Error(
      "Invitation not found."
    );
  }

  const challenge =
    await challengeRepository.getChallengeById(
      invitation.challengeId
    );

  if (!challenge) {
    throw new Error(
      "Challenge not found."
    );
  }

  const creator =
    await userRepository.getUserById(
      challenge.userId
    );

  return {
    creatorName: creator?.name || null,
    title: challenge.title,
    deadlineAt: challenge.deadlineAt,
    successCriteria: challenge.successCriteria,
    invitationStatus: invitation.status,
  };
};

 const declineInvitation = async ({ token }) => {
  // -----------------------------
  // Fetch Runtime Data
  // -----------------------------

  const invitation =
    await invitationRepository.getInvitationByToken(
      token
    );

  const challenge = invitation
    ? await challengeRepository.getChallengeById(
        invitation.challengeId
      )
    : null;

  // -----------------------------
  // Trust Decision
  // -----------------------------

  const decision =
    witnessDecisionService.evaluateWitnessDecision({
      action: "DECLINE_INVITATION",
      invitation,
      challenge,
    });

  if (!decision.allowed) {
    throw new Error(decision.reason);
  }

  // -----------------------------
  // Runtime Execution
  // -----------------------------

  await invitationRepository.declineInvitation(
    invitation._id
  );

  await witnessCoordinator.onInvitationDeclined({
  challenge,
});

  return {
    success: true,
    challengeId: challenge._id,
  };
};

export default {
  createInvitation,
  regenerateInvitation,
  acceptInvitation,
  declineInvitation,
  getInvitationDetails,
};
 