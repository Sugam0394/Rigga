import challengeRepository from "../repositories/challengeRepositories.js";

import invitationRepository from "../repositories/invitationRepository.js";

import appealRepository from "../repositories/appealRepository.js";

import witnessTimelineService from "./witnessTimelineService.js";

 const getInvitationStatus = async ({
  challengeId,
  userId,
}) => {
  // -----------------------------
  // Read Challenge
  // -----------------------------

  const challenge =
    await challengeRepository.getChallengeById(
      challengeId
    );

  if (!challenge) {
    throw new Error(
      "Challenge not found."
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
      "Unauthorized."
    );
  }

  // -----------------------------
  // Read Invitation
  // -----------------------------

  const invitation =
    await invitationRepository.getInvitationByChallengeId(
      challengeId
    );

  // -----------------------------
  // Runtime Response
  // -----------------------------

  return {
  challengeId,
  status: invitation?.status ?? null,
  expiresAt: invitation?.expiresAt ?? null,
  canAccept:
    invitation?.status === "ACTIVE",
  canDecline:
    invitation?.status === "ACTIVE",
};
};

 const getWitnessStatus = async ({
  challengeId,
  userId,
}) => {
  // -----------------------------
  // Read Challenge
  // -----------------------------

  const challenge =
    await challengeRepository.getChallengeById(
      challengeId
    );

  if (!challenge) {
    throw new Error(
      "Challenge not found."
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
      "Unauthorized."
    );
  }

  // -----------------------------
  // Runtime Response
  // -----------------------------

  return {
    challengeId,

    hasWitness:
      Boolean(
        challenge.witness?.name
      ),

    witness: challenge.witness?.name
      ? {
          name:
            challenge.witness.name,
          phone:
            challenge.witness.phone,
        }
      : null,

    notifiedAt:
      challenge.witness?.notifiedAt ??
      null,

    decision:
      challenge.witness?.decision ??
      null,

    decidedAt:
      challenge.witness?.decidedAt ??
      null,
  };
};

 const getReviewStatus = async ({
  challengeId,
  userId,
}) => {
  // -----------------------------
  // Read Challenge
  // -----------------------------

  const challenge =
    await challengeRepository.getChallengeById(
      challengeId
    );

  if (!challenge) {
    throw new Error(
      "Challenge not found."
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
      "Unauthorized."
    );
  }

  // -----------------------------
  // Runtime Response
  // -----------------------------

  const reviewOpen =
    challenge.status ===
      CHALLENGE_STATUS.UNDER_REVIEW ||
    challenge.status ===
      CHALLENGE_STATUS.APPEALED;

  return {
    challengeId,

    reviewState:
      challenge.witness?.decision ??
      "PENDING",

    canReview:
      reviewOpen &&
      !challenge.witness?.decision,

    submittedAt:
      challenge.witness?.decidedAt ??
      null,

    rejectionReason:
      challenge.witness
        ?.rejectionReason ?? null,
  };
};

 const getAppealStatus = async ({
  challengeId,
  userId,
}) => {
  // -----------------------------
  // Read Challenge
  // -----------------------------

  const challenge =
    await challengeRepository.getChallengeById(
      challengeId
    );

  if (!challenge) {
    throw new Error(
      "Challenge not found."
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
      "Unauthorized."
    );
  }

  // -----------------------------
  // Read Appeal
  // -----------------------------

  const appeal =
    await appealRepository.getByChallengeId(
      challengeId
    );

  // -----------------------------
  // Runtime Response
  // -----------------------------

  const appealDeadline =
    challenge.witness?.decidedAt
      ? new Date(
          challenge.witness.decidedAt
        )
      : null;

  if (appealDeadline) {
    appealDeadline.setHours(
      appealDeadline.getHours() + 6
    );
  }

  return {
    challengeId,

    appealState: appeal
      ? "SUBMITTED"
      : "NOT_SUBMITTED",

    canAppeal:
      challenge.witness?.decision ===
        "REJECTED" &&
      !appeal &&
      appealDeadline &&
      new Date() < appealDeadline,

    windowOpen:
      appealDeadline
        ? new Date() < appealDeadline
        : false,

    expiresAt: appealDeadline,

    submittedAt:
      appeal?.submittedAt ?? null,
  };
};

 const getWitnessTimeline = async ({
  challengeId,
  userId,
}) => {
  // -----------------------------
  // Read Challenge
  // -----------------------------

  const challenge =
    await challengeRepository.getChallengeById(
      challengeId
    );

  if (!challenge) {
    throw new Error(
      "Challenge not found."
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
      "Unauthorized."
    );
  }

  // -----------------------------
  // Read Supporting Resources
  // -----------------------------

  const invitation =
    await invitationRepository.getInvitationByChallengeId(
      challengeId
    );

  const appeal =
    await appealRepository.getByChallengeId(
      challengeId
    );

  // -----------------------------
  // Delegate to Timeline Builder
  // -----------------------------

  return witnessTimelineService.buildWitnessTimeline({
    challenge,
    invitation,
    appeal,
  });
};

export default {
  getInvitationStatus,
  getWitnessStatus,
  getReviewStatus,
  getAppealStatus,
  getWitnessTimeline,
};