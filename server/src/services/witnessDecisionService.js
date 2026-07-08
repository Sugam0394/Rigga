 import {
  WITNESS_DECISION_REASON,
} from "../constants/witnessDecisionReasons.js";

const allowDecision = ({
  stage,
  nextAction,
  invitationStatus = null,
  reviewStatus = null,
}) => ({
  allowed: true,
  reason: WITNESS_DECISION_REASON.SUCCESS,
  stage,
  nextAction,
  invitationStatus,
  reviewStatus,
});

const denyDecision = ({
  reason,
  stage,
  nextAction = null,
  invitationStatus = null,
  reviewStatus = null,
}) => ({
  allowed: false,
  reason,
  stage,
  nextAction,
  invitationStatus,
  reviewStatus,
});

const evaluateInvitationDecision = () => {
  return denyDecision({
    reason:
      WITNESS_DECISION_REASON.NOT_IMPLEMENTED,
    stage: "INVITATION",
  });
};

const evaluateReviewDecision = () => {
  return denyDecision({
    reason:
      WITNESS_DECISION_REASON.NOT_IMPLEMENTED,
    stage: "REVIEW",
  });
};

const evaluateAppealDecision = () => {
  return denyDecision({
    reason:
      WITNESS_DECISION_REASON.NOT_IMPLEMENTED,
    stage: "APPEAL",
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
      });

    case "SUBMIT_APPEAL":
      return evaluateAppealDecision({
        action,
        challenge,
        appeal,
      });

    default:
      return denyDecision({
        reason:
          WITNESS_DECISION_REASON.UNKNOWN_ACTION,
        stage: "UNKNOWN",
      });
  }
};

export default {
  evaluateWitnessDecision,
};