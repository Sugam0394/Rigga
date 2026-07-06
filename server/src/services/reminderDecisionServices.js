 import progressEligibilityService from "./progressEligibilityService.js";

const shouldSendReminder = async ({
  challenge,
  userId,
}) => {
  if (!challenge) {
    return {
      shouldSend: false,
      reason: "INVALID_CHALLENGE",
      urgency: "NONE",
      tone: "NONE",
      observationMode: null,
    };
  }

  if (challenge.status !== "ACTIVE") {
    return {
      shouldSend: false,
      reason: "CHALLENGE_NOT_ACTIVE",
      urgency: "NONE",
      tone: "NONE",
      observationMode: null,
    };
  }

  if (!challenge.observationStrategy) {
    return {
      shouldSend: false,
      reason: "OBSERVATION_STRATEGY_MISSING",
      urgency: "NONE",
      tone: "NONE",
      observationMode: null,
    };
  }

  const eligibility =
    await progressEligibilityService.canSubmit({
      challengeId: challenge._id,
      userId,
    });

  if (!eligibility.canSubmit) {
  return {
    shouldSend: false,
    reason:
      eligibility.reason ===
      "Already submitted in current observation window"
        ? "ALREADY_SUBMITTED"
        : eligibility.reason,
    urgency: "NONE",
    tone: "NONE",
    observationMode:
      eligibility.observationMode,
  };
}

  return {
    shouldSend: true,
    reason: "REMINDER_REQUIRED",
    urgency: "ENCOURAGEMENT",
    tone: "ENCOURAGEMENT",
    observationMode:
      eligibility.observationMode,
  };
};

export default {
  shouldSendReminder,
};