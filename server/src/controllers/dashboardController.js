 import dashboardRuntimeService
  from "../services/dashboardRuntimeService.js";

const getChallengeDashboard = async (
  req,
  res
) => {
  try {
    const dashboard =
      await dashboardRuntimeService
        .getDashboardRuntime({
          challengeId:
            req.params.id,

          userId:
            req.user.userId,
        });

    res.status(200).json({
      success: true,
      data: dashboard,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export default {
  getChallengeDashboard,
};