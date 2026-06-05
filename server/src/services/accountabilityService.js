import {
  ACCOUNTABILITY_MESSAGE_TYPES,
} from "../constants/accountabilityConstants.js";

const buildMessage = ({
  type,
  title,
  message,
}) => {
  return {
    type,
    title,
    message,
  };
};


const generateMotivation = () => {
  return buildMessage({
    type:
      ACCOUNTABILITY_MESSAGE_TYPES.MOTIVATION,

    title:
      "Keep Going",

    message:
      "You committed to this challenge. Stay consistent and keep moving forward.",
  });
};


const generateCheckpointNudge = () => {
  return buildMessage({
    type:
      ACCOUNTABILITY_MESSAGE_TYPES.CHECKPOINT_NUDGE,

    title:
      "Checkpoint Due",

    message:
      "Your checkpoint is due. Submit evidence and stay accountable to your commitment.",
  });
};

const generateReviewReminder = () => {
  return buildMessage({
    type:
      ACCOUNTABILITY_MESSAGE_TYPES.REVIEW_REMINDER,

    title:
      "Review Pending",

    message:
      "A review is waiting for action. Complete it as soon as possible.",
  });
};

const generateAppealWarning = () => {
  return buildMessage({
    type:
      ACCOUNTABILITY_MESSAGE_TYPES.APPEAL_WARNING,

    title:
      "Appeal Expiring",

    message:
      "Your appeal window is closing soon. Take action before the deadline passes.",
  });
};

const generateSuccessMessage = () => {
  return buildMessage({
    type:
      ACCOUNTABILITY_MESSAGE_TYPES.SUCCESS_MESSAGE,

    title:
      "Challenge Completed",

    message:
      "Congratulations. You completed your commitment and stayed accountable to your goal.",
  });
};

 const generateFailureMessage = () => {
  return buildMessage({
    type:
      ACCOUNTABILITY_MESSAGE_TYPES.FAILURE_MESSAGE,

    title:
      "Challenge Failed",

    message:
      "The commitment was not completed. Review what happened, learn from it, and prepare for the next challenge.",
  });
};

export default {
  generateMotivation,
  generateCheckpointNudge,
  generateReviewReminder,
  generateAppealWarning,
  generateSuccessMessage,
  generateFailureMessage,
};




 