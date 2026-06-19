 import tokenValidationService from "../services/tokenValidationService.js";

import witnessReviewService from "../services/witnessReviewService.js";

const submitPublicReview = async (
  req,
  res,
  next
) => {
  try {
    const { token } = req.params;

    const {
      decision,
      rejectionReason,
    } = req.body;

    const VALID_DECISIONS = [
      "APPROVED",
      "REJECTED",
    ];

    if (
      !VALID_DECISIONS.includes(
        decision
      )
    ) {
      throw new Error(
        "Invalid review decision"
      );
    }

    const challenge =
      await tokenValidationService
        .validateReviewToken(
          token
        );

    let updatedChallenge;

    if (
      decision ===
      "APPROVED"
    ) {
      updatedChallenge =
        await witnessReviewService
          .approveChallenge(
            challenge._id
          );
    } else {
      updatedChallenge =
        await witnessReviewService
          .rejectChallenge({
            challengeId:
              challenge._id,
            rejectionReason,
          });
    }

    console.log(
      "[PUBLIC REVIEW SUBMITTED]",
      {
        challengeId:
          challenge._id,
        decision,
      }
    );

    return res.status(200).json({
      success: true,
      data: updatedChallenge,
    });
  } catch (error) {
    next(error);
  }
};

export default {
  submitPublicReview,
};