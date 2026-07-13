 import dashboardService
  from "./dashboardService.js";

import dashboardTimelineService
  from "./dashboardTimelineService.js";

const buildDashboard = async ({
  challengeId,
  userId,
}) => {
  const dashboard =
    await dashboardService.getChallengeDashboard(
      challengeId,
      userId
    );

  const timeline =
  dashboardTimelineService.buildDashboardTimeline(
    [] // TODO: Replace with real awareness events during timeline integration.
  );
  return {
    ...dashboard,

    timeline:
      timeline.events,
  };
};

export default {
  buildDashboard,
};