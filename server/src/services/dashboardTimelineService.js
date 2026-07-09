const buildDashboardTimeline = (
  events = []
) => {
  const normalizedEvents =
    events
      .map((event) => ({
        type: event.type,

        timestamp:
          event.timestamp,

        priority:
          event.priority ??
          "NORMAL",

        sourceEngine:
          event.sourceEngine,

        metadata:
          event.metadata ??
          {},
      }))

      .sort(
        (first, second) =>
          new Date(
            second.timestamp
          ) -
          new Date(
            first.timestamp
          )
      );

  return {
    events:
      normalizedEvents,
  };
};

export default {
  buildDashboardTimeline,
};