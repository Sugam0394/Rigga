 import dashboardService
  from "./dashboardService.js";

const getDashboardRuntime = async ({
  challengeId,
  userId,
}) => {
  const dashboard =
    await dashboardService.getChallengeDashboard(
      challengeId,
      userId
    );

  return {
    attention: null,

    focus: null,

    challenge:
      dashboard.challenge,

    accountabilityPlan:
      dashboard.accountabilityPlan,

    witness:
      dashboard.witness,

    progress:
      dashboard.progress,

    checkpoints:
      dashboard.checkpoints,

    reminders:
      dashboard.reminders,

    consequence:
      dashboard.consequence,

    dashboardMeta: {
      version: 1,
      runtime:
        "DASHBOARD_RUNTIME_V1",
      generatedAt:
        new Date().toISOString(),
    },
  };
};

export default {
  getDashboardRuntime,
};