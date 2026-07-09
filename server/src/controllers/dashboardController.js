 import dashboardCoordinator
  from "./dashboardCoordinator.js";

const getDashboardRuntime = async ({
  challengeId,
  userId,
}) => {
  const dashboard =
    await dashboardCoordinator.buildDashboard({
      challengeId,
      userId,
    });

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

    timeline:
      dashboard.timeline,

    dashboardMeta: {
      version: 1,
      runtime:
        "DASHBOARD_RUNTIME_V1",
      generatedAt:
        new Date().toISOString(),
    },
  };
};

// Official Public Runtime API
const getChallengeDashboard =
  getDashboardRuntime;

export default {
  getDashboardRuntime,
  getChallengeDashboard,
};