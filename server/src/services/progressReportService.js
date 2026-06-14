import mongoose from "mongoose";
import { ACCOUNTABILITY_RULES } from "../constants/accountabilityRules.js";
import progressReportRepository from "../repositories/progressReportRepository.js";
import challengeRepository from "../repositories/challengeRepositories.js"
import userNotificationService from "./userNotificationService.js";
import { NOTIFICATION_EVENTS, } from "../constants/notificationEvents.js";
import { getTodayRange } from "../utils/dateUtils.js";


 const submitProgressReport = async (
  reportData
) => {
  const {
    challengeId,
    notes,
    userId,
  } = reportData;

  if (!challengeId) {
    throw new Error(
      "Challenge ID is required"
    );
  }

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

  if (!notes) {
    throw new Error(
      "Progress notes are required"
    );
  }

  if (
    notes.trim().length < 20
  ) {
    throw new Error(
      "Progress notes must be at least 20 characters"
    );
  }

  if (
    notes.length > 1000
  ) {
    throw new Error(
      "Progress notes cannot exceed 1000 characters"
    );
  }

  if (!reportData.imageUrl) {
    throw new Error(
      "Evidence image is required"
    );
  }

  const challenge =
    await challengeRepository
      .getChallengeById(
        challengeId
      );

  if (!challenge) {
    throw new Error(
      "Challenge not found"
    );
  }

  if (
    challenge.status !==
    "ACTIVE"
  ) {
    throw new Error(
      "Progress reports can only be submitted for active challenges"
    );
  }

  if (
  !challenge.userId.equals(
    userId
  )
) {
  throw new Error(
    "Forbidden"
  );
}

 const {
  startOfDay,
  endOfDay,
} = getTodayRange();
 

 const [
  reportsToday,
  duplicateReport,
] = await Promise.all([
  progressReportRepository
    .getReportsSubmittedToday({
      challengeId,
      userId,
      startOfDay,
      endOfDay,
    }),

  progressReportRepository
    .findDuplicateReportToday({
      challengeId,
      userId,
      notes,
      imageUrl:
        reportData.imageUrl,
      startOfDay,
      endOfDay,
    }),
]);

if (duplicateReport) {
  throw new Error(
    "Duplicate evidence detected."
  );
}

if (
  reportsToday.length >=
  ACCOUNTABILITY_RULES.MAX_REPORTS_PER_DAY
) {
  throw new Error(
    "You have already submitted a progress report today."
  );
}


 const progressReport =
  await progressReportRepository
    .createProgressReport({
      challengeId,
      userId,
      notes,
      imageUrl:
        reportData.imageUrl,
         
    });

await userNotificationService
  .createEventNotification({
    userId:
      challenge.userId,

    type:
      NOTIFICATION_EVENTS
        .PROGRESS_REPORT_SUBMITTED,

    entityType:
      "CHALLENGE",

    entityId:
      challenge._id,
  });

return progressReport;
};

const getChallengeReports = async (
  challengeId,
  userId
) => {
  const challenge =
    await challengeRepository
      .getChallengeById(
        challengeId
      );

  if (!challenge) {
    throw new Error(
      "Challenge not found"
    );
  }

  if (
    challenge.userId.toString() !==
    userId
  ) {
    throw new Error(
      "Forbidden"
    );
  }

  return await progressReportRepository
    .getByChallengeId(
      challengeId
    );
};

export default {
  submitProgressReport,
  getChallengeReports
};