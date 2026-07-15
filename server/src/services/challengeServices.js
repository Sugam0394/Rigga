import challengeRepository from "../repositories/challengeRepositories.js";
import witnessService from "./witnessServices.js";
import consequenceService from "./consequenceService.js";
import checkpointService from "./checkPointService.js";
import notificationService from "./notificationService.js";
import userNotificationService from "./userNotificationService.js";
import { NOTIFICATION_EVENTS } from "../constants/notificationEvents.js";
import generateReviewLink from "./reviewLinkService.js";
import challengeClasssifier from "./challengeClasssifier.js";
import accountabilityPlanService from "./accountabilityPlanService.js";
import invitationService from "./invitationService.js";
import { NOTIFICATION_TYPES,} from "../constants/notificationConstants.js";
import observationStrategyService from "./observationStrategyService.js";
import notificationEventService from "./notificationEventService.js";







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
 


    const durationDays =
  Math.floor(
    (
      deadlineDate.getTime() -
      Date.now()
    ) /
    (1000 * 60 * 60 * 24)
  ) + 1;

const accountabilityPlan =
  accountabilityPlanService
    .generateAccountabilityPlan({
      title,
      successCriteria,
      durationDays,
    });

const {
  category,
} = accountabilityPlan;

 const observationStrategy =
  observationStrategyService
    .generateObservationStrategy({
      title,
      successCriteria,
      durationDays,
    });

 const challengePayload = {
  userId,
  title,
  category,
  deadlineAt: deadlineDate,
  successCriteria,
  observationStrategy,
};

 

  const challenge =
    await challengeRepository.createChallenge(
      challengePayload
    );

  const invitation =
  await invitationService.createInvitation({
    challengeId: challenge._id,
  });


  await consequenceService.createConsequence({
    challengeId: challenge._id,
    privateMessage,
  });

 await checkpointService.createCheckpoints({
  challengeId: challenge._id,
  startDate: challenge.createdAt,
  endDate: challenge.deadlineAt,

  accountabilityPlan,
});

 
 
try {

  const notificationEvent =
    notificationEventService
      .createNotificationEvent({
        eventType:
          NOTIFICATION_EVENTS
            .CHALLENGE_CREATED,

        sourceEngine:
          "CHALLENGE",

        userId,

        entityType:
          "CHALLENGE",

        entityId:
          challenge._id,

        payload: {},
      });

  await userNotificationService
    .createEventNotification(
      notificationEvent
    );

} catch (error) {

  console.error(
    "[CHALLENGE NOTIFICATION FAILED]",
    error
  );

}

 

  return {
    challenge,
    invitation,
  }
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