import witnessAnalyticsService
  from "../services/witnessAnalyticsService.js";

import {
  WITNESS_ANALYTICS_EVENTS,
} from "../constants/witnessAnalyticsEvents.js";

const trackShare = async (
  req,
  res,
  next
) => {
  try {

    await witnessAnalyticsService
      .trackEvent({
        challengeId:
          req.params.challengeId,

        eventType:
          WITNESS_ANALYTICS_EVENTS
            .REVIEW_LINK_SHARED,
      });

    console.log(
      "[LINK_SHARED]",
      req.params.challengeId
    );

    res.status(200).json({
      success: true,
    });

  } catch (error) {
    next(error);
  }
};

export default {
  trackShare,
};