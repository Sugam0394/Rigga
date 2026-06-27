 import challengeClassifier
  from "./challengeClasssifier.js";

import evidenceRules
  from "./evidenceRules.js";

import checkpointStrategyRules
  from "./checkPointStrategyRules.js";

import reminderStrategyRules
  from "./reminderStrategyRules.js";

const generateAccountabilityPlan = ({
  title = "",
  successCriteria = "",
  durationDays = 1,
}) => {

  const safeDurationDays =
    Number.isFinite(
      durationDays
    ) &&
    durationDays > 0
      ? durationDays
      : 1;

  const { category } =
    challengeClassifier
      .classifyChallenge({
        title,
        successCriteria,
      });

  const evidenceRecommendations =
    evidenceRules
      .getEvidenceRecommendations(
        category
      );

  const checkpointStrategy =
    checkpointStrategyRules
      .getCheckpointStrategy({
        category,
        durationDays:
          safeDurationDays,
      });

  const reminderStrategy =
    reminderStrategyRules
      .getReminderStrategy({
        category,
      });

  return {
    category,

    evidenceRecommendations,

    checkpointStrategy,

    reminderStrategy,
  };
};

export default {
  generateAccountabilityPlan,
};