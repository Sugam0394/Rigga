 import witnessAnalyticsService
  from "../services/witnessAnalyticsService.js";

const getWitnessFunnel = async (
  req,
  res,
  next
) => {
  try {

    const metrics =
      await witnessAnalyticsService
        .getFunnelMetrics(
          req.params.challengeId
        );

    res.status(200).json({
      success: true,
      data: metrics,
    });

  } catch (error) {
    next(error);
  }
};

export default {
  getWitnessFunnel,
};

 

 