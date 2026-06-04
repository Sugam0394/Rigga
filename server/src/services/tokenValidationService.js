import Challenge from "../models/challengeModel.js";

const validateReviewToken = async (
  token
) => {
  const challenge =
    await Challenge.findOne({
      "witness.reviewToken": token,
    });

  if (!challenge) {
    throw new Error("Invalid review token");
  }

  if (
    challenge.witness.reviewTokenExpiresAt <
    new Date()
  ) {
    throw new Error(
      "Review token has expired"
    );
  }

  return challenge;
};

export default {
  validateReviewToken,
};