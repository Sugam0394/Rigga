import progressReportRepository from "../repositories/progressReportRepository.js";

import {
  ACCOUNTABILITY_RULES,
} from "../constants/accountabilityRules.js";






 const getProgressEligibility = async ({
  challengeId,
  userId,
}) => {

  const startOfDay =
    new Date();

  startOfDay.setHours(
    0,
    0,
    0,
    0
  );

  const endOfDay =
    new Date();

  endOfDay.setHours(
    23,
    59,
    59,
    999
  );

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