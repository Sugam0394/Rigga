 import challengeRepository from "../repositories/challengeRepositories.js";

import {
  CHALLENGE_STATUS,
} from "../constants/challengeStatus.js";

const validateReviewToken = async (
  token
) => {

  const challenge =
    await challengeRepository
      .getByReviewToken(
        token
      );

  if (!challenge) {
    throw new Error(
      "Invalid review token"
    );
  }

  if (
    !challenge.witness
      ?.reviewTokenExpiresAt
  ) {
    throw new Error(
      "Review token is invalid"
    );
  }

  if (
    challenge.witness
      .reviewTokenExpiresAt <
    new Date()
  ) {
    throw new Error(
      "Review token has expired"
    );
  }

  if (
    challenge.witness
      ?.decision
  ) {
    throw new Error(
      "Review already submitted"
    );
  }

  if (
    challenge.status !==
      CHALLENGE_STATUS.UNDER_REVIEW &&
    challenge.status !==
      CHALLENGE_STATUS.APPEALED
  ) {
    throw new Error(
      "This challenge is not yet ready for review"
    );
  }

  return challenge;
};

export default {
  validateReviewToken,
};