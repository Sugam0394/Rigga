import accountabilityAggregationService
  from "./accountabilityAggregateService.js";

import aiInsightService
  from "./aiInsightService.js";

import aiNarrativeService
  from "./aiNarrativeService.js";

import AI_COACH_TYPES
  from "../constants/aiCouchTypes.js";

const generateConsistencyCoach = ({
  consistency,
}) => {

  switch (
    consistency
  ) {

    case "HIGH":
      return "Maintain your current reporting rhythm.";

    case "MEDIUM":
      return "Try submitting evidence more consistently.";

    case "LOW":
      return "Regular reporting will strengthen accountability.";

    default:
      return "Continue documenting your progress.";
  }
};

const generateWitnessCoach = ({
  witnessEngagement,
}) => {

  switch (
    witnessEngagement
  ) {

    case "HIGHLY_ENGAGED":
      return "Your witness remains actively involved.";

    case "MODERATELY_ENGAGED":
      return "Keep your witness informed as the challenge progresses.";

    case "LOW_ENGAGEMENT":
      return "Consider contacting your witness before the review stage.";

    default:
      return "Maintain communication with your witness.";
  }
};

const generateProgressCoach = ({
  challenge,
  progressReports,
}) => {

  const deadline =
    new Date(
      challenge.deadlineAt
    );

  const createdAt =
    new Date(
      challenge.createdAt
    );

  const durationInDays =
    Math.max(
      1,
      Math.ceil(
        (deadline - createdAt) /
        (1000 * 60 * 60 * 24)
      )
    );

  const reportCount =
    progressReports.length;

  if (
    reportCount === 0
  ) {
    return "Submit your first progress report to begin building accountability.";
  }

  if (
    reportCount <
    durationInDays * 0.3
  ) {
    return "More frequent evidence submissions will strengthen accountability.";
  }

  if (
    reportCount <
    durationInDays * 0.7
  ) {
    return "Your reporting pattern is developing well. Continue documenting progress consistently.";
  }

  return "Your reporting habits are strong. Maintain your current momentum.";
};

const generateReviewCoach = ({
  challengeHealth,
}) => {

  switch (
    challengeHealth
  ) {

    case "ON_TRACK":
      return "Continue submitting accountability evidence.";

    case "REVIEW_PENDING":
      return "Your challenge is awaiting witness verification.";

    case "COMPLETED":
      return "This challenge has successfully completed the accountability process.";

    case "FAILED":
      return "Review the challenge outcome and reflect on lessons learned.";

    case "APPEAL_ACTIVE":
      return "Your challenge is currently under appeal review.";

    default:
      return "Continue progressing through your accountability journey.";
  }
};

const generateAppealCoach = ({
  appeal,
  challengeHealth,
}) => {

  if (
    challengeHealth ===
    "APPEAL_ACTIVE"
  ) {
    return "Your appeal is under review. No additional action is required.";
  }

  if (
    appeal
  ) {
    return "An appeal has been submitted and is part of the accountability record.";
  }

  return "No appeal action is currently required.";
};

const calculatePriority = ({
  consistency,
  witnessEngagement,
  challengeHealth,
}) => {

  if (
    challengeHealth ===
      "APPEAL_ACTIVE" ||

    challengeHealth ===
      "REVIEW_PENDING"
  ) {
    return "HIGH";
  }

  if (
    consistency ===
      "LOW"
  ) {
    return "HIGH";
  }

  if (
    witnessEngagement ===
      "LOW_ENGAGEMENT"
  ) {
    return "MEDIUM";
  }

  if (
    consistency ===
      "MEDIUM"
  ) {
    return "MEDIUM";
  }

  return "LOW";
};


const getAICoach = async ({
  challengeId,
  userId,
}) => {

  const insights =
  await aiInsightService
    .getAIInsights({
      challengeId,
      userId,
    });

  const narratives =
    await aiNarrativeService
      .getAINarrative({
        challengeId,
        userId,
      });

    const {
  challenge,
  progressReports,
  appeal,
} =
await accountabilityAggregationService
  .getAccountabilityContext(
    challengeId
  );

      const consistencyCoach =
  generateConsistencyCoach({
    consistency:
      insights
        .consistency
        .value,
  });

  const witnessCoach =
  generateWitnessCoach({
    witnessEngagement:
      insights
        .witnessEngagement
        .value,
  });

  const progressCoach =
  generateProgressCoach({
    challenge,
    progressReports,
  });

  const reviewCoach =
  generateReviewCoach({
    challengeHealth:
      insights
        .challengeHealth
        .value,
  });

 const appealCoach =
  generateAppealCoach({
    appeal,
    challengeHealth:
      insights
        .challengeHealth
        .value,
  });

  const priority =
  calculatePriority({
    consistency:
      insights
        .consistency
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

  return {
   consistencyCoach: {
  type:
    AI_COACH_TYPES
      .CONSISTENCY_COACH,

  recommendation:
    consistencyCoach,
},

 witnessCoach: {
  type:
    AI_COACH_TYPES
      .WITNESS_COACH,

  recommendation:
    witnessCoach,
},

 progressCoach: {
  type:
    AI_COACH_TYPES
      .PROGRESS_COACH,

  recommendation:
    progressCoach,
},

 reviewCoach: {
  type:
    AI_COACH_TYPES
      .REVIEW_COACH,

  recommendation:
    reviewCoach,
},

   appealCoach: {
  type:
    AI_COACH_TYPES
      .APPEAL_COACH,

  recommendation:
    appealCoach,
},

    priority,
      

    generatedAt:
      new Date(),
  };
};

export default {
  getAICoach,
};