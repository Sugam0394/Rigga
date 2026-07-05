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
 // If a valid review token already exists,
// reuse it instead of generating a new one.

if (
  challenge.witness.reviewToken &&
  challenge.witness.reviewTokenExpiresAt &&
  challenge.witness.reviewTokenExpiresAt > new Date()
) {

  return {
    expiresAt:
      challenge.witness.reviewTokenExpiresAt,

    reviewUrl:
      reviewTokenService.buildReviewUrl(
        challenge.witness.reviewToken
      ),
  };
}

const token =
  reviewTokenService.generateReviewToken();

const expiresAt =
  reviewTokenService.generateReviewTokenExpiry();

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