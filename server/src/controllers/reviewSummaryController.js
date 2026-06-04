import reviewSummaryService from "../services/reviewSummaryService.js";

export const getReviewSummary = async (req, res) => {
  try {

    const { id } = req.params;

    
  const summary = await reviewSummaryService.getReviewSummary(id);

  res.status(200).json({
    success: true,
    data: summary,
  });
}  catch (error) {
  const statusCode =
    error.message === "Challenge not found"
      ? 404
      : 500;

  res.status(statusCode).json({
    success: false,
    message: error.message,
  });
}
};

