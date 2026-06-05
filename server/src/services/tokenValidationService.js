 import challengeRepository from "../repositories/challengeRepositories.js";

 

const validateReviewToken = async (
  token
) => {
  const challenge =
  await challengeRepository.getByReviewToken(
    token
  );

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