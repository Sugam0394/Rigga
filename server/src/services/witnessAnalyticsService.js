import witnessAnalyticsRepository
  from "../repositories/witnessAnalyticsRepository.js";

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

export default {
  trackEvent,
  getFunnelMetrics
};