 import mongoose from "mongoose";

import progressReportRepository
  from "../repositories/progressReportRepository.js";

import challengeRepository
  from "../repositories/challengeRepositories.js";

import userNotificationService
  from "./userNotificationService.js";

import {
  NOTIFICATION_EVENTS,
} from "../constants/notificationEvents.js";

import progressEligibilityService
  from "./progressEligibilityService.js";

import { getTodayRange }
  from "../utils/dateUtils.js";

const validateProgressPayload = ({
  challengeId,
  userId,
  notes,
}) => {
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
};

const validateEvidence = ({
  imageUrl,
}) => {
  if (!imageUrl) {
    throw new Error(
      "Evidence image is required"
    );
  }
};

const submitProgressReport = async (
  reportData
) => {
  const {
    challengeId,
    notes,
    userId,
    imageUrl,
  } = reportData;

  validateProgressPayload({
    challengeId,
    userId,
    notes,
  });

  validateEvidence({
    imageUrl,
  });

  const eligibility =
    await progressEligibilityService
      .canSubmit({
        challengeId,
        userId,
      });

  if (!eligibility.canSubmit) {
    throw new Error(
      eligibility.reason
    );
  }

  const challenge =
    await challengeRepository
      .getChallengeById(
        challengeId
      );

  const {
    startOfDay,
    endOfDay,
  } = getTodayRange();

  const duplicateReport =
    await progressReportRepository
      .findDuplicateReportToday({
        challengeId,
        userId,
        notes,
        imageUrl,
        startOfDay,
        endOfDay,
      });

  if (duplicateReport) {
    throw new Error(
      "Duplicate evidence detected."
    );
  }

  const progressReport =
    await progressReportRepository
      .createProgressReport({
        challengeId,
        userId,
        notes,
        imageUrl,
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

  return progressReportRepository
    .getByChallengeId(
      challengeId
    );
};

export default {
  submitProgressReport,
  getChallengeReports,
};