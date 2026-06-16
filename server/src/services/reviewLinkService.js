 import reviewTokenService from "./reviewTokenService.js";
import challengeRepository from "../repositories/challengeRepositories.js";

 const generateReviewLink = async (
  challengeId
) => {
  console.log(
    "[GENERATE REVIEW LINK]",
    challengeId
  );

  const challenge =
    await challengeRepository.getChallengeById(
      challengeId
    );

  if (!challenge) {
    throw new Error(
      "Challenge not found"
    );
  }

  const token =
    reviewTokenService.generateReviewToken();

  const expiresAt =
    reviewTokenService.generateReviewTokenExpiry();

  challenge.witness.reviewToken =
    token;

  challenge.witness.reviewTokenExpiresAt =
    expiresAt;

  await challenge.save();

  console.log(
    "[TOKEN SAVED]",
    challenge.witness.reviewToken
  );

  const reviewUrl =
    reviewTokenService.buildReviewUrl(
      token
    );

  return {
    expiresAt,
    reviewUrl,
  };
};

export default {
  generateReviewLink,
};