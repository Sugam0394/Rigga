import witnessAnalyticsRepository
  from "../repositories/witnessAnalyticsRepository.js";

 import challengeRepository
  from "../repositories/challengeRepositories.js";





const trackEvent = async ({
  challengeId,
  eventType,
  metadata = {},
}) => {

  const existingEvent =
    await witnessAnalyticsRepository
      .findEvent({
        challengeId,
        eventType,
      });

  if (existingEvent) {
    return existingEvent;
  }

  const event =
    await witnessAnalyticsRepository
      .createEvent({
        challengeId,
        eventType,
        metadata,
      });

  console.log(
    "[WITNESS_EVENT_TRACKED]",
    {
      challengeId,
      eventType,
    }
  );

  return event;
};

const getFunnelMetrics = async (
  challengeId
) => {

  return witnessAnalyticsRepository
    .getFunnelMetrics(
      challengeId
    );
};

const validateOwnership = async ({
  challengeId,
  userId,
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
    challenge.userId
      .toString() !==
    userId
  ) {
    throw new Error(
      "Forbidden"
    );
  }

  return challenge;
};

export default {
  trackEvent,
  getFunnelMetrics,
  validateOwnership
};