 import challengeRepository from "../repositories/challengeRepositories.js";
import witnessService from "./witnessServices.js";
import consequenceService from "./consequenceService.js";
import checkpointService from "./checkPointService.js";
import notificationService from "./notificationService.js";
import userNotificationService from "./userNotificationService.js";
import { NOTIFICATION_EVENTS } from "../constants/notificationEvents.js";
import generateReviewLink from "./reviewLinkService.js";



import {
  NOTIFICATION_TYPES,
} from "../constants/notificationConstants.js";

 const createChallenge = async (challengeData) => {
  const {
    userId,
    title,
    deadlineAt,
    privateMessage,
    witness,
    successCriteria,
  } = challengeData;

  if (
    !userId ||
    !title ||
    !deadlineAt ||
    !privateMessage ||
    !witness ||
    !witness.name ||
    !witness.phone ||
    !successCriteria
  ) {
    throw new Error("All fields are required");
  }

    const deadlineDate =
  new Date(deadlineAt);

if (
  Number.isNaN(
    deadlineDate.getTime()
  )
) {
  throw new Error(
    "Invalid deadline"
  );
}

if (
  deadlineDate <= new Date()
) {
  throw new Error(
    "Deadline must be in the future"
  );
}

  const challengePayload = {
    userId,
    title,
    deadlineAt: deadlineDate,
    witness,
    successCriteria,
  };

 

  const challenge =
    await challengeRepository.createChallenge(
      challengePayload
    );

    await reviewLinkGeneratorService
  .generateReviewLink(
    challenge._id
  );


  await consequenceService.createConsequence({
    challengeId: challenge._id,
    privateMessage,
  });

  await checkpointService.createCheckpoints({
    challengeId: challenge._id,
    startDate: challenge.createdAt,
    endDate: challenge.deadlineAt,
  });

  await witnessService.notifyWitness(
    challenge
  );

   await notificationService.createNotification({
    challengeId: challenge._id,
    recipientType: "WITNESS",
    recipientPhone: challenge.witness.phone,
    type: NOTIFICATION_TYPES.CHALLENGE_CREATED,
    challengeTitle: challenge.title,
    userName: witness.name,
  });


  await userNotificationService
  .createEventNotification({
    userId,
    type:
      NOTIFICATION_EVENTS
        .CHALLENGE_CREATED,

    entityType:
      "CHALLENGE",

    entityId:
      challenge._id,
  });

  return challenge;
};

const getUserChallenges = async (userId) => {
  return challengeRepository.getChallengesByUserId(
    userId
  );
};

export default {
  createChallenge,
  getUserChallenges,
};