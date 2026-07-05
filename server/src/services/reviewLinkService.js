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

// Validate URL BEFORE any database write
const reviewUrl =
  reviewTokenService.buildReviewUrl(
    token
  );

challenge.witness.reviewToken =
  token;

challenge.witness.reviewTokenExpiresAt =
  expiresAt;

await challenge.save();

return {
  expiresAt,
  reviewUrl,
};
};

export default {
  generateReviewLink,
};