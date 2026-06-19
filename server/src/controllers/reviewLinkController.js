 import reviewLinkService from "../services/reviewLinkService.js";

export const generateReviewLink = async (
  req,
  res
) => {
  try {
    const { id } = req.params;

    const result =
      await reviewLinkService.generateReviewLink(
        id
      );

    res.status(200).json({
      success: true,
      data: result,
    });
  } catch (error) {
    res.status(404).json({
      success: false,
      message: error.message,
    });
  }
};