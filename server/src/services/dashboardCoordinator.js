 import dashboardService
  from "./dashboardService.js";

import dashboardTimelineService
  from "./dashboardTimelineService.js";

const buildDashboard = async ({
  challengeId,
  userId,
}) => {

  const dashboard =
    await dashboardService
      .getChallengeDashboard(
        challengeId,
        userId
      );

  const progressEvents =
    dashboard.progressReports.map(
      (report) => ({

        type:
          "PROGRESS_REPORT",

        timestamp:
          report.createdAt,

        priority:
          "NORMAL",

        sourceEngine:
          "PROGRESS_ENGINE",

        metadata: {

          reportId:
            report._id,

          challengeId:
            report.challengeId,

        },

      })
    );

  const timeline =
    dashboardTimelineService
      .buildDashboardTimeline(
        progressEvents
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