import challengeService from "../services/challengeServices.js";

const createChallenge = async (req, res) => {
  try {
    const challenge =
      await challengeService.createChallenge(
        req.body
      );

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

export default {
  createChallenge,
};