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
 

    const coach =
      await aiCoachService
        .getAICoach({
          challengeId,
          userId,
        });

     

    return res
      .status(200)
      .json({
        success: true,
        data: coach,
      });

  } catch (error) {

    

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