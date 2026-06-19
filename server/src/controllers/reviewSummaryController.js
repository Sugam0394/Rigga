import reviewSummaryService from "../services/reviewSummaryService.js";

export const getReviewSummary = async (req, res) => {
  try {

    const { id } = req.params;

    
  const summary =
  await reviewSummaryService
    .getReviewSummary(
      id,
      req.user.userId
    );

  res.status(200).json({
    success: true,
    data: summary,
  });
}  catch (error) {
   let statusCode = 500;

if (
  error.message ===
  "Challenge not found"
) {
  statusCode = 404;
}

if (
  error.message ===
  "Forbidden"
) {
  statusCode = 403;
}

  res.status(statusCode).json({
    success: false,
    message: error.message,
  });
}
};

