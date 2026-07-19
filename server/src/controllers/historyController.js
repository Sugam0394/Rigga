import historyRuntimeService
  from "../services/historyRuntimeService.js";

const getChallengeHistory = async (
  req,
  res,
  next
) => {

  try {

    const runtime =
      await historyRuntimeService
        .getHistoryRuntime({
          userId:
            req.user.userId,
        });

    return res.status(200).json({
      success: true,
      data: runtime,
    });

  } catch (error) {

    next(error);

  }

};

export default {
  getChallengeHistory,
};