 import witnessAnalyticsService
  from "../services/witnessAnalyticsService.js";

const getWitnessFunnel = async (
  req,
  res,
  next
) => {
  try {

    const {
      challengeId,
    } = req.params;

    await witnessAnalyticsService
      .validateOwnership({
        challengeId,
        userId:
          req.user.userId,
      });

    const metrics =
      await witnessAnalyticsService
        .getFunnelMetrics(
          challengeId
        );

    return res.status(200).json({
      success: true,
      data: metrics,
    });

  } catch (error) {

    if (
      error.message ===
      "Challenge not found"
    ) {
      return res.status(404).json({
        success: false,
        message: error.message,
      });
    }

    if (
      error.message ===
      "Forbidden"
    ) {
      return res.status(403).json({
        success: false,
        message: error.message,
      });
    }

    next(error);
  }
};

export default {
  getWitnessFunnel,
};

 

 