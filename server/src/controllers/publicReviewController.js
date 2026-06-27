import tokenValidationService from "../services/tokenValidationService.js";
 import reviewSummaryService from "../services/reviewSummaryService.js";
import witnessAnalyticsService from "../services/witnessAnalyticsService.js";
import { WITNESS_ANALYTICS_EVENTS } from "../constants/witnessAnalyticsEvents.js";


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

  await witnessAnalyticsService
  .trackEvent({
    challengeId:
      challenge._id,

    eventType:
      WITNESS_ANALYTICS_EVENTS
        .REVIEW_LINK_OPENED,
  });

 

const summary =
  await reviewSummaryService.getReviewSummary(
    challenge._id
  );

  await witnessAnalyticsService
  .trackEvent({
    challengeId:
      challenge._id,

    eventType:
      WITNESS_ANALYTICS_EVENTS
        .REVIEW_STARTED,
  });

 

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