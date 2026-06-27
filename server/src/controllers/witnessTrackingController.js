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
const {


      challengeId,
    } = req.params;

    await witnessAnalyticsService
      .validateOwnership({
        challengeId,
        userId:
          req.user.userId,
      });


    await witnessAnalyticsService
      .trackEvent({
        challengeId:
          req.params.challengeId,

        eventType:
          WITNESS_ANALYTICS_EVENTS
            .REVIEW_LINK_SHARED,
      });

     

    res.status(200).json({
      success: true,
    });

  } catch (error) {
if (
      error.message ===
      "Challenge not found"
    ) {
      return res.status(404).json({
        success: false,
        message: error.message,
      });
    }

    if (
      error.message ===
      "Forbidden"
    ) {
      return res.status(403).json({
        success: false,
        message: error.message,
      });
    }

    next(error);
  }
};

export default {
  trackShare,
};