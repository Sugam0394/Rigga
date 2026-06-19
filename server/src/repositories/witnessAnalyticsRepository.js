import WitnessAnalytics
  from "../models/witnessAnalyticsModel.js";

const createEvent = async ({
  challengeId,
  eventType,
  metadata = {},
}) => {
  return WitnessAnalytics.create({
    challengeId,
    eventType,
    metadata,
  });
};

const getChallengeEvents = async (
  challengeId
) => {
  return WitnessAnalytics.find({
    challengeId,
  }).sort({
    createdAt: 1,
  });
};

const findEvent = async ({
  challengeId,
  eventType,
}) => {
  return WitnessAnalytics.findOne({
    challengeId,
    eventType,
  });
};

const getFunnelMetrics = async (
  challengeId
) => {

  const events =
    await WitnessAnalytics.find({
      challengeId,
    });

  return {
    shared:
      events.filter(
        event =>
          event.eventType ===
          "REVIEW_LINK_SHARED"
      ).length,

    opened:
      events.filter(
        event =>
          event.eventType ===
          "REVIEW_LINK_OPENED"
      ).length,

    started:
      events.filter(
        event =>
          event.eventType ===
          "REVIEW_STARTED"
      ).length,

    submitted:
      events.filter(
        event =>
          event.eventType ===
          "REVIEW_SUBMITTED"
      ).length,
  };
};

const getEventCount = async ({
  challengeId,
  eventType,
}) => {
  return WitnessAnalytics.countDocuments({
    challengeId,
    eventType,
  });
};

export default {
  createEvent,
  getChallengeEvents,
  findEvent,
  getFunnelMetrics,
  getEventCount
};