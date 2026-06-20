 import aiCoachService
  from "../services/aiCouchService.js";

const getAICoach = async (
  req,
  res,
  next
) => {

  try {

    const {
      challengeId,
    } = req.params;

    const userId =
      req.user.userId;

    console.log(
      "[AI_COACH_CONTROLLER]"
    );

    console.log(
      "challengeId:",
      challengeId
    );

    console.log(
      "userId:",
      userId
    );

    const coach =
      await aiCoachService
        .getAICoach({
          challengeId,
          userId,
        });

    console.log(
      "[AI_COACH_SUCCESS]"
    );

    return res
      .status(200)
      .json({
        success: true,
        data: coach,
      });

  } catch (error) {

    console.log(
      "[AI_COACH_ERROR]"
    );

    console.log(
      error.message
    );

    console.log(
      error.stack
    );

    next(error);
  }
};

export default {
  getAICoach,
};