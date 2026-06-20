import accountabilityAggregationService from "../services/accountabilityAggregateService.js"
import AI_INSIGHT_TYPES from "../constants/aiInsightTypes.js";
import witnessAnalyticsService from "./witnessAnalyticsService.js";
import { CHALLENGE_STATUS } from "../constants/challengeStatus.js";
import challengeRepository from "../repositories/challengeRepositories.js";



const calculateConsistency = ({
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

  const consistencyRatio =
    reportCount /
    durationInDays;

  if (
    consistencyRatio >= 0.7
  ) {
    return "HIGH";
  }

  if (
    consistencyRatio >= 0.3
  ) {
    return "MEDIUM";
  }

  return "LOW";
};

const calculateWitnessEngagement = (
  metrics
) => {

  const score = [
    metrics.shared,
    metrics.opened,
    metrics.started,
    metrics.submitted,
  ].filter(Boolean).length;

  if (score >= 4) {
    return "HIGHLY_ENGAGED";
  }

  if (score >= 2) {
    return "MODERATELY_ENGAGED";
  }

  return "LOW_ENGAGEMENT";
};
const calculateChallengeHealth = ({
  challenge,
  appeal,
}) => {

  if (
    appeal &&
    appeal.status === "PENDING"
  ) {
    return "APPEAL_ACTIVE";
  }

  switch (
    challenge.status
  ) {

    case CHALLENGE_STATUS.COMPLETED:
      return "COMPLETED";

    case CHALLENGE_STATUS.FAILED:
      return "FAILED";

    case CHALLENGE_STATUS.REVIEW_PENDING:
      return "REVIEW_PENDING";

    case CHALLENGE_STATUS.ACTIVE:
      return "ON_TRACK";

    default:
      return "AT_RISK";
  }
};

const generateAccountabilitySummary = ({
  progressReports,
  consistency,
  witnessEngagement,
  challengeHealth,
}) => {

  return `
You submitted ${progressReports.length} progress reports during this challenge.

Your accountability consistency was ${consistency}.

Your witness engagement was ${witnessEngagement}.

Your challenge is currently ${challengeHealth}.
`.trim();

};


const getAIInsights = async ({
  challengeId , userId ,
}) => {


const challenge =
  await challengeRepository
    .getChallengeById(
      challengeId
    );

if (!challenge) {
  throw new Error(
    "Challenge not found"
  );
}

if (
  challenge.userId.toString() !==
  userId
) {
  throw new Error(
    "Forbidden"
  );
}
 const {
  challenge:
    challengeContext,
  progressReports,
  checkpoints,
  appeal,
  consequence,
} =
await accountabilityAggregationService
  .getAccountabilityContext(
    challengeId
  );
 
 const consistency =
  calculateConsistency({
    challenge:
      challengeContext,
    progressReports,
  });


 const funnelMetrics =
  await witnessAnalyticsService
    .getFunnelMetrics(
      challengeId
    );

const witnessEngagement =
  calculateWitnessEngagement(
    funnelMetrics
  );

 
 const challengeHealth =
  calculateChallengeHealth({
    challenge:
      challengeContext,
    appeal,
  });

 const summary =
  generateAccountabilitySummary({
    progressReports,
    consistency,
    witnessEngagement,
    challengeHealth,
  });

  return {
  consistency: {
    type:
      AI_INSIGHT_TYPES.CONSISTENCY,
    value:
      consistency,
  },

  witnessEngagement: {
    type:
      AI_INSIGHT_TYPES.WITNESS_ENGAGEMENT,
    value:
      witnessEngagement,
  },

  challengeHealth: {
    type:
      AI_INSIGHT_TYPES.CHALLENGE_HEALTH,
    value:
      challengeHealth,
  },

  summary: {
    type:
      AI_INSIGHT_TYPES.ACCOUNTABILITY_SUMMARY,
    value:
      summary,
  },
};
};

export default {
  getAIInsights,
};