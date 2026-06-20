 import aiInsightsService from "../services/aiInsightService.js";

const getAIInsights = async (
  req,
  res
) => {

  const {
    challengeId,
  } = req.params;

  const insights =
    await aiInsightsService
      .getAIInsights({
        challengeId,
        userId:
          req.user.userId,
      });

  return res.status(200).json({
    success: true,
    data: insights,
  });
};

export default {
  getAIInsights,
};