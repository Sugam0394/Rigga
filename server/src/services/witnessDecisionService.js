 import {
  CHALLENGE_STATUS,
} from "../constants/challengeStatus.js";

import {
  INVITATION_STATUS,
} from "../constants/invitationStatus.js";

import {
  WITNESS_DECISION_REASON,
} from "../constants/witnessDecisionReasons.js";

 

const evaluateInvitationDecision = ({
  action,
  challenge,
  invitation,
}) => {
  if (!invitation) {
    return denyDecision({
      reason:
        WITNESS_DECISION_REASON.INVITATION_NOT_FOUND,
      stage: "INVITATION",
    });
  }

  if (!challenge) {
    return denyDecision({
      reason:
        WITNESS_DECISION_REASON.CHALLENGE_NOT_FOUND,
      stage: "INVITATION",
      invitationStatus:
        invitation.status,
    });
  }

  if (
    invitation.status ===
    INVITATION_STATUS.SUPERSEDED
  ) {
    return denyDecision({
      reason:
        WITNESS_DECISION_REASON.INVITATION_SUPERSEDED,
      stage: "INVITATION",
      invitationStatus:
        invitation.status,
    });
  }

  if (
    invitation.status ===
      INVITATION_STATUS.ACCEPTED &&
    action === "ACCEPT_INVITATION"
  ) {
    return denyDecision({
      reason:
        WITNESS_DECISION_REASON.INVITATION_ALREADY_ACCEPTED,
      stage: "INVITATION",
      invitationStatus:
        invitation.status,
    });
  }

  if (
    invitation.status ===
      INVITATION_STATUS.DECLINED &&
    action === "DECLINE_INVITATION"
  ) {
    return denyDecision({
      reason:
        WITNESS_DECISION_REASON.INVITATION_ALREADY_DECLINED,
      stage: "INVITATION",
      invitationStatus:
        invitation.status,
    });
  }

  if (
    challenge.status !==
    CHALLENGE_STATUS.PENDING_WITNESS
  ) {
    return denyDecision({
      reason:
        WITNESS_DECISION_REASON.CHALLENGE_NOT_PENDING_WITNESS,
      stage: "INVITATION",
      invitationStatus:
        invitation.status,
    });
  }

  if (
    challenge.deadlineAt <=
    new Date()
  ) {
    return denyDecision({
      reason:
        WITNESS_DECISION_REASON.CHALLENGE_DEADLINE_PASSED,
      stage: "INVITATION",
      invitationStatus:
        invitation.status,
    });
  }

  return allowDecision({
    stage: "INVITATION",
    nextAction: action,
    invitationStatus:
      invitation.status,
    reviewStatus:
      challenge?.witness?.decision ??
      "NOT_STARTED",
  });
};

const evaluateReviewDecision = ({
  action,
  challenge,
  rejectionReason,
}) => {
  if (!challenge) {
    return denyDecision({
      reason:
        WITNESS_DECISION_REASON.CHALLENGE_NOT_FOUND,
      stage: "REVIEW",
    });
  }

  if (
    challenge.status !==
      CHALLENGE_STATUS.UNDER_REVIEW &&
    challenge.status !==
      CHALLENGE_STATUS.APPEALED
  ) {
    return denyDecision({
      reason:
        WITNESS_DECISION_REASON.REVIEW_NOT_ALLOWED,
      stage: "REVIEW",
      reviewStatus:
        challenge.witness?.decision ??
        "NOT_STARTED",
    });
  }

  if (
    challenge.witness?.decision &&
    challenge.status !==
      CHALLENGE_STATUS.APPEALED
  ) {
    return denyDecision({
      reason:
        WITNESS_DECISION_REASON.REVIEW_ALREADY_SUBMITTED,
      stage: "REVIEW",
      reviewStatus:
        challenge.witness.decision,
    });
  }

  if (
    action === "REJECT_REVIEW"
  ) {
    if (!rejectionReason) {
      return denyDecision({
        reason:
          WITNESS_DECISION_REASON.REJECTION_REASON_REQUIRED,
        stage: "REVIEW",
      });
    }

    const wordCount =
      rejectionReason
        .trim()
        .split(/\s+/).length;

    if (wordCount < 30) {
      return denyDecision({
        reason:
          WITNESS_DECISION_REASON.REJECTION_REASON_TOO_SHORT,
        stage: "REVIEW",
      });
    }

    if (wordCount > 200) {
      return denyDecision({
        reason:
          WITNESS_DECISION_REASON.REJECTION_REASON_TOO_LONG,
        stage: "REVIEW",
      });
    }
  }

  return allowDecision({
    stage: "REVIEW",
    nextAction: action,
    reviewStatus:
      challenge.witness?.decision ??
      "NOT_STARTED",
  });
};

const evaluateWitnessDecision = ({
  action,
  challenge = null,
  invitation = null,
  witness = null,
  appeal = null,
}) => {


  

  switch (action) {
    case "ACCEPT_INVITATION":
    case "DECLINE_INVITATION":
    case "REGENERATE_INVITATION":
      return evaluateInvitationDecision({
        action,
        challenge,
        invitation,
        witness,
      });

    case "APPROVE_REVIEW":
case "REJECT_REVIEW":
  return evaluateReviewDecision({
    action,
    challenge,
    rejectionReason:
      witness?.rejectionReason,
  });

    case "SUBMIT_APPEAL":
      return evaluateAppealDecision({
        action,
        challenge,
        appeal,
      });

    default:
       
  }
};

const evaluateAppealDecision = ({
  challenge,
  appeal,
  notes,
}) => {

  if (!challenge) {
    return denyDecision({
      reason:
        WITNESS_DECISION_REASON.CHALLENGE_NOT_FOUND,
      stage: "APPEAL",
    });
  }

  if (
    challenge.witness?.decision !==
    "REJECTED"
  ) {
    return denyDecision({
      reason:
        WITNESS_DECISION_REASON.APPEAL_NOT_ALLOWED,
      stage: "APPEAL",
      reviewStatus:
        challenge.witness?.decision,
    });
  }

  if (!notes) {
    return denyDecision({
      reason:
        WITNESS_DECISION_REASON.APPEAL_NOTES_REQUIRED,
      stage: "APPEAL",
    });
  }

  const trimmedNotes =
    notes.trim();

  if (
    trimmedNotes.length < 50
  ) {
    return denyDecision({
      reason:
        WITNESS_DECISION_REASON.APPEAL_NOTES_TOO_SHORT,
      stage: "APPEAL",
    });
  }

  if (
    trimmedNotes.length > 1000
  ) {
    return denyDecision({
      reason:
        WITNESS_DECISION_REASON.APPEAL_NOTES_TOO_LONG,
      stage: "APPEAL",
    });
  }

  if (appeal) {
    return denyDecision({
      reason:
        WITNESS_DECISION_REASON.APPEAL_ALREADY_SUBMITTED,
      stage: "APPEAL",
    });
  }

  const deadline =
    new Date(
      challenge.witness.decidedAt
    );

  deadline.setHours(
    deadline.getHours() + 6
  );

  if (
    new Date() > deadline
  ) {
    return denyDecision({
      reason:
        WITNESS_DECISION_REASON.APPEAL_WINDOW_EXPIRED,
      stage: "APPEAL",
    });
  }

  return allowDecision({
    stage: "APPEAL",
    nextAction:
      "SUBMIT_APPEAL",
    reviewStatus:
      challenge.witness?.decision,
  });
};

export default {
  evaluateWitnessDecision,
};