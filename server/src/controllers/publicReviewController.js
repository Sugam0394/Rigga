import tokenValidationService from "../services/tokenValidationService.js";
 import reviewSummaryService from "../services/reviewSummaryService.js";



export const getPublicReview = async (
  req,
  res
) => {
  try {
    const { token } = req.params;

  const challenge =
  await tokenValidationService.validateReviewToken(
    token
  );

const summary =
  await reviewSummaryService.getReviewSummary(
    challenge._id
  );

res.status(200).json({
  success: true,
  data: summary,
});
  } catch (error) {
    res.status(401).json({
      success: false,
      message: error.message,
    });
  }
};