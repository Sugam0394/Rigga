 import dashboardRunTimeService
  from "../services/dashboardRunTimeService.js";

 import dashboardHomeRunTimeService
   from "../services/dashboardHomeRunTimeServices.js";

const getChallengeDashboard = async (
  req,
  res,
  next
) => {
  try {
    const dashboard =
      await dashboardRunTimeService
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
    next(error);
  }
};

const getHomeDashboardRuntime = async (
  req,
  res,
  next
) => {
  try {
    const dashboard =
      await dashboardHomeRunTimeService
        .getHomeDashboardRuntime({
          userId:
            req.user.userId,
        });

    res.status(200).json({
      success: true,
      data: dashboard,
    });
  } catch (error) {
    next(error);
  }
};

export default {
  getChallengeDashboard,
  getHomeDashboardRuntime,
};