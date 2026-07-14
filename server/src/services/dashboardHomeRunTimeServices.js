 


 import dashboardHomeCoordinator
  from "./dashboardHomeCoordinator.js";

 

 

const getHomeDashboardRuntime = async ({
  userId,
}) => {

  const dashboard =
    await dashboardHomeCoordinator
      .buildHomeDashboard({
        userId,
      });

   return {

  summary:
    dashboard.summary,

  immediateAction:
    dashboard.immediateAction,

  activeCommitments:
    dashboard.activeCommitments,

  reminders:
    dashboard.reminders,

  dashboardMeta: {
    version: 1,

    runtime:
      "HOME_DASHBOARD_RUNTIME_V1",

    generatedAt:
      new Date().toISOString(),
  },
};
};

export default {
  getHomeDashboardRuntime,
};