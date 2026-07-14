import progressReportRepository from "../repositories/progressReportRepository.js";
import mongoose from "mongoose";
 
import { getTodayRange } from "../utils/dateUtils.js";

import challengeRepository
  from "../repositories/challengeRepositories.js";

import observationStrategyService
  from "./observationStrategyService.js";



 const canSubmit = async ({
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
    !challenge.userId.equals(
      userId
    )
  ) {
    return {
      canSubmit: false,
      reason: "Forbidden",
      observationMode: null,
      nextEligibleAt: null,
    };
  }

  if (
    challenge.status !==
    "ACTIVE"
  ) {
    return {
      canSubmit: false,
      reason:
        "Challenge not ACTIVE",
      observationMode: null,
      nextEligibleAt: null,
    };
  }

  if (!challenge.observationStrategy) {
    return {
      canSubmit: false,
      reason:
        "Observation Strategy is missing",
      observationMode: null,
      nextEligibleAt: null,
    };
  }

  const observationRuntime =
    observationStrategyService
      .getObservationRuntime({
        observationStrategy:
          challenge.observationStrategy,
      });

  const {
    startOfDay,
    endOfDay,
  } = getTodayRange();

 const reports =
  await progressReportRepository
    .getReportsForObservationWindow({
      challengeId,
      userId,
      observationWindow:
        observationRuntime.observationWindow,
      startOfDay,
      endOfDay,
    });

    

 let nextEligibleAt = null;

if (
  observationRuntime.observationWindow === "DAY"
) {
  nextEligibleAt = new Date(endOfDay.getTime() + 1);
}

 return {
  canSubmit: false,
  reason:
    "Already submitted in current observation window",
  observationMode:
    challenge.observationStrategy.observationMode,
  nextEligibleAt,
};

  return {
    canSubmit: true,
    reason: "Eligible",
    observationMode:
      challenge
        .observationStrategy
        .observationMode,
    nextEligibleAt: null,
  };
};

export default {
  canSubmit,
};