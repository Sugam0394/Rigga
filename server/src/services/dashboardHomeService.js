 import challengeRepository
  from "../repositories/challengeRepositories.js";

 import { ACTIVE_COMMITMENT_STATUSES } from "../constants/dashboardConstants.js";

 

import { CHALLENGE_STATUS }
  from "../constants/challengeStatus.js";

import reminderRepository
  from "../repositories/reminderRepository.js";
  

const buildSummary = (
  challenges
) => {
  return {
    totalCommitments:
      challenges.length,

    pendingWitness:
      challenges.filter(
        challenge =>
          challenge.status ===
          CHALLENGE_STATUS.PENDING_WITNESS
      ).length,

    active:
      challenges.filter(
        challenge =>
          challenge.status ===
          CHALLENGE_STATUS.ACTIVE
      ).length,

    underReview:
      challenges.filter(
        challenge =>
          challenge.status ===
          CHALLENGE_STATUS.UNDER_REVIEW
      ).length,

    completed:
      challenges.filter(
        challenge =>
          challenge.status ===
          CHALLENGE_STATUS.COMPLETED
      ).length,

    rejected:
      challenges.filter(
        challenge =>
          challenge.status ===
          CHALLENGE_STATUS.REJECTED
      ).length,

    appealed:
      challenges.filter(
        challenge =>
          challenge.status ===
          CHALLENGE_STATUS.APPEALED
      ).length,

    failed:
      challenges.filter(
        challenge =>
          challenge.status ===
          CHALLENGE_STATUS.FAILED
      ).length,
  };
};

 

const buildActiveCommitments = (
  challenges
) => {
 return challenges
  .filter(challenge =>
  ACTIVE_COMMITMENT_STATUSES.includes(
    challenge.status
  )
)
  .map(challenge => ({
    id: challenge._id,
    title: challenge.title,
    category: challenge.category,
    status: challenge.status,
    deadlineAt: challenge.deadlineAt,
  }));
};

const buildImmediateAction = (
  challenges
) => {

  const rejected =
    challenges.find(
      challenge =>
        challenge.status ===
        CHALLENGE_STATUS.REJECTED
    );

  if (rejected) {
    return {
      type: "REVIEW_REJECTION",
      challengeId: rejected._id,
      title: rejected.title,
    };
  }

  const review =
    challenges.find(
      challenge =>
        challenge.status ===
        CHALLENGE_STATUS.UNDER_REVIEW
    );

  if (review) {
    return {
      type: "WAIT_FOR_WITNESS",
      challengeId: review._id,
      title: review.title,
    };
  }

  const active =
    challenges.find(
      challenge =>
        challenge.status ===
        CHALLENGE_STATUS.ACTIVE
    );

  if (active) {
    return {
      type: "SUBMIT_PROGRESS",
      challengeId: active._id,
      title: active.title,
    };
  }

  return null;
};


const buildRecentResult = (
  challenges
) => {
  const recentResults =
    challenges
      .filter(
        challenge =>
          challenge.status ===
            CHALLENGE_STATUS.COMPLETED ||

          challenge.status ===
            CHALLENGE_STATUS.FAILED
      )
      .sort(
        (a, b) =>
          new Date(b.finishedAt) -
          new Date(a.finishedAt)
      );

  if (
    recentResults.length === 0
  ) {
    return null;
  }

  const recentResult =
    recentResults[0];

  return {
    id: recentResult._id,
    title: recentResult.title,
    status: recentResult.status,
    finishedAt:
      recentResult.finishedAt,
  };
};

const buildReminderSummary = (
  reminders
) => {
  return {
    total: reminders.length,

    pending:
      reminders.filter(
        reminder =>
          reminder.status === "PENDING"
      ).length,

    triggered:
      reminders.filter(
        reminder =>
          reminder.status === "TRIGGERED"
      ).length,

    expired:
      reminders.filter(
        reminder =>
          reminder.status === "EXPIRED"
      ).length,
  };
};

const getHomeDashboard = async (userId) => {

    const challenges =
      await challengeRepository
        .getChallengesByUserId(
          userId
        );

        const challengeIds =
  challenges.map(
    challenge => challenge._id
  );



const reminders =  await reminderRepository .getRemindersByChallenges(
      challengeIds
    );

  return {
  summary:
    buildSummary(challenges),

  immediateAction:
    buildImmediateAction(challenges),

  activeCommitments:
    buildActiveCommitments(challenges),

  recentResult:
    buildRecentResult(challenges),

  reminders:
    buildReminderSummary(
      reminders
    ),
};

}

   

export default {
  getHomeDashboard,
};
  

 