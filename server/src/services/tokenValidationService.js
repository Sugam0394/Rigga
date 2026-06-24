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

    console.log(
      "[INVALID REVIEW ATTEMPT]",
      token
    );

    throw new Error(
      "Invalid review token"
    );
  }

  if (
    !challenge.witness
      ?.reviewTokenExpiresAt
  ) {

    console.log(
      "[INVALID REVIEW ATTEMPT]",
      token
    );

    throw new Error(
      "Review token is invalid"
    );
  }

  if (
    challenge.witness
      .reviewTokenExpiresAt <
    new Date()
  ) {

    console.log(
      "[REVIEW TOKEN EXPIRED]",
      token
    );

    throw new Error(
      "Review token has expired"
    );
  }

  if (
  challenge.witness?.decision &&
  challenge.status !==
    CHALLENGE_STATUS.APPEALED
) {

  console.log(
    "[REVIEW ALREADY SUBMITTED]",
    token
  );

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

    console.log(
      "[INVALID REVIEW ATTEMPT]",
      {
        token,
        challengeId:
          challenge._id,
        status:
          challenge.status,
      }
    );

    throw new Error(
      "This challenge is not yet ready for review"
    );
  }

  console.log(
    "[REVIEW TOKEN VALIDATED]",
    {
      challengeId:
        challenge._id,
    }
  );

  return challenge;
};

export default {
  validateReviewToken,
};