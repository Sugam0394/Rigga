import accountabilityAggregationService
  from "./accountabilityAggregateService.js";

import aiInsightService
  from "./aiInsightService.js";

import AI_NARRATIVE_TYPES
  from "../constants/aiNarrativeTypes.js";

const generateProgressNarrative = ({
  consistency,
}) => {

  switch (
    consistency
  ) {

    case "HIGH":
      return "You maintained strong reporting consistency throughout this commitment.";

    case "MEDIUM":
      return "You submitted progress evidence regularly but there were periods of reduced activity.";

    case "LOW":
      return "Your reporting activity was limited during this commitment.";

    default:
      return "Progress reporting information is currently unavailable.";
  }
};

const generateWitnessNarrative = ({
  witnessEngagement,
}) => {

  switch (
    witnessEngagement
  ) {

    case "HIGHLY_ENGAGED":
      return "Your witness actively participated throughout the review process.";

    case "MODERATELY_ENGAGED":
      return "Your witness reviewed portions of the accountability journey.";

    case "LOW_ENGAGEMENT":
      return "Witness interaction with this commitment was limited.";

    default:
      return "Witness engagement information is currently unavailable.";
  }
};

const generateAccountabilityNarrative = ({
  consistency,
  witnessEngagement,
  challengeHealth,
}) => {

  if (
    consistency === "HIGH" &&
    witnessEngagement ===
      "HIGHLY_ENGAGED"
  ) {
    return "You demonstrated strong accountability habits through regular evidence submission and active witness participation.";
  }

  if (
    consistency === "HIGH"
  ) {
    return "You maintained healthy accountability behaviors through consistent progress reporting.";
  }

  if (
    consistency === "MEDIUM"
  ) {
    return "Your accountability journey showed steady effort with opportunities for greater consistency.";
  }

  if (
    challengeHealth ===
    "APPEAL_ACTIVE"
  ) {
    return "Your accountability journey is currently under appeal review.";
  }

  return "Accountability activity was limited throughout this commitment.";
};

const generateOutcomeNarrative = ({
  challengeHealth,
}) => {

  switch (
    challengeHealth
  ) {

    case "ON_TRACK":
      return "This commitment remains active and accountability tracking is ongoing.";

    case "REVIEW_PENDING":
      return "Your commitment is awaiting witness verification.";

    case "APPEAL_ACTIVE":
      return "Your appeal has been submitted and final review is pending.";

    case "COMPLETED":
      return "This commitment successfully completed the accountability process.";

    case "FAILED":
      return "This commitment did not successfully complete the accountability process.";

    default:
      return "Outcome information is currently unavailable.";
  }
};

const generateMasterNarrative = ({
  progressNarrative,
  witnessNarrative,
  accountabilityNarrative,
  outcomeNarrative,
}) => {

  return `
${progressNarrative}

${witnessNarrative}

${accountabilityNarrative}

${outcomeNarrative}
`.trim();

};








const getAINarrative = async ({
  challengeId,
  userId,
}) => {

  const insights =
    await aiInsightService
      .getAIInsights({
        challengeId,
        userId,
      });

      const progressNarrative =
  generateProgressNarrative({
    consistency:
      insights.consistency
        .value,
  });

  const witnessNarrative =
  generateWitnessNarrative({
    witnessEngagement:
      insights
        .witnessEngagement
        .value,
  });

  const accountabilityNarrative =
  generateAccountabilityNarrative({
    consistency:
      insights.consistency
        .value,

    witnessEngagement:
      insights
        .witnessEngagement
        .value,

    challengeHealth:
      insights
        .challengeHealth
        .value,
  });

  const outcomeNarrative =
  generateOutcomeNarrative({
    challengeHealth:
      insights
        .challengeHealth
        .value,
  });

  const masterNarrative =
  generateMasterNarrative({
    progressNarrative,
    witnessNarrative,
    accountabilityNarrative,
    outcomeNarrative,
  });

  const context =
    await accountabilityAggregationService
      .getAccountabilityContext(
        challengeId
      );

  return {
    progressNarrative: {
  type:
    AI_NARRATIVE_TYPES
      .PROGRESS_NARRATIVE,

  value:
    progressNarrative,
},

  witnessNarrative: {
  type:
    AI_NARRATIVE_TYPES
      .WITNESS_NARRATIVE,

  value:
    witnessNarrative,
},

  accountabilityNarrative: {
  type:
    AI_NARRATIVE_TYPES
      .ACCOUNTABILITY_NARRATIVE,

  value:
    accountabilityNarrative,
},

   outcomeNarrative: {
  type:
    AI_NARRATIVE_TYPES
      .OUTCOME_NARRATIVE,

  value:
    outcomeNarrative,
},
    masterNarrative: {
  type:
    AI_NARRATIVE_TYPES
      .MASTER_NARRATIVE,

  value:
    masterNarrative,
},

    generatedAt:
      new Date(),
  };
};

export default {
  getAINarrative,
};