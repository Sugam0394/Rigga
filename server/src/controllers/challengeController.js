import challengeService from "../services/challengeServices.js";

const createChallenge = async (req, res) => {
  try {
   const challenge =
  await challengeService.createChallenge({
    ...req.body,
    userId:
      req.user.userId,
  });

    res.status(201).json({
      success: true,
      data: challenge,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

const getUserChallenges = async (
  req,
  res
) => {
  try {
    const challenges =
      await challengeService.getUserChallenges(
        req.user.userId
      );

    res.status(200).json({
      success: true,
      data: challenges,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message:
        "Failed to retrieve challenges",
    });
  }
};

export default {
  createChallenge,
  getUserChallenges
};