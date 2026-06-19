import progressReportRepository from "../repositories/progressReportRepository.js";
import mongoose from "mongoose";
import {
  ACCOUNTABILITY_RULES,
} from "../constants/accountabilityRules.js";
import { getTodayRange } from "../utils/dateUtils.js";





 const getProgressEligibility = async ({
  challengeId,
  userId,
}) => {

  if (
    !mongoose.Types.ObjectId.isValid(
      challengeId
    )
  ) {
    throw new Error(
      "Invalid challenge ID"
    );
  }

  if (
    !mongoose.Types.ObjectId.isValid(
      userId
    )
  ) {
    throw new Error(
      "Invalid user session"
    );
  }

  const {
    startOfDay,
    endOfDay,
  } = getTodayRange();

  const reportsToday =
    await progressReportRepository
      .getReportsSubmittedToday({
        challengeId,
        userId,
        startOfDay,
        endOfDay,
      });

  if (
    reportsToday.length >=
    ACCOUNTABILITY_RULES.MAX_REPORTS_PER_DAY
  ) {
    return {
      canSubmit: false,
      reason:
        "Already submitted today",
    };
  }

  return {
    canSubmit: true,
    reason: null,
  };
};

export default {
  getProgressEligibility,
};