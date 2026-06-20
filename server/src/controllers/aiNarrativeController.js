import aiNarrativeService
  from "../services/aiNarrativeService.js";

const getAINarrative = async (
  req,
  res
) => {

  const {
    challengeId,
  } = req.params;

  const narrative =
    await aiNarrativeService
      .getAINarrative({
        challengeId,
        userId:
          req.user.userId,
      });

  return res.status(200).json({
    success: true,
    data: narrative,
  });
};

export default {
  getAINarrative,
};