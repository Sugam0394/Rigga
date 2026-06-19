import witnessReviewService
  from "../services/witnessReviewService.js";

const submitReview = async (
  req,
  res,
  next) => {

  try {

    const { id } =
      req.params;

    const {
      decision,
      rejectionReason,
    } = req.body;

    let challenge;

    if (
      decision ===
      "APPROVED"
    ) {

      challenge =
        await witnessReviewService
          .approveChallenge(
            id
          );

    } else {

      challenge =
        await witnessReviewService
          .rejectChallenge({
            challengeId: id,
            rejectionReason,
          });

    }

    return res.status(200).json({
      success: true,
      data: challenge,
    });

  } catch (error) {

    next(error);

  }
};

export default {
  submitReview,
};