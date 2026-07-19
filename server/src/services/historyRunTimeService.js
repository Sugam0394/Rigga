 import historyService
  from "./historyService.js";

const buildHistoryCard = (
  challenge
) => {

  const startedAt =
    challenge.createdAt
      ? new Date(challenge.createdAt)
      : null;

  const completedAt =
    challenge.completedAt
      ? new Date(challenge.completedAt)
      : null;

  let durationDays = null;

  if (
    startedAt &&
    completedAt
  ) {

    durationDays =
      Math.max(
        1,
        Math.ceil(
          (
            completedAt -
            startedAt
          ) /
          (
            1000 *
            60 *
            60 *
            24
          )
        )
      );

  }

  return {

    id:
      challenge._id,

    title:
      challenge.title,

    category:
      challenge.category,

    status:
      challenge.status,

    completedAt:
      challenge.completedAt,

    deadlineAt:
      challenge.deadlineAt,

    durationDays,

    witnessDecision:
      challenge.witness?.decision ??
      null,

  };

};

const getHistoryRuntime = async ({
  userId,
}) => {

  const challenges =
    await historyService
      .getChallengeHistory({
        userId,
      });

  const history =
    challenges.map(
      buildHistoryCard
    );

  return {

    history,

    pagination: {

      page: 1,

      limit:
        history.length,

      total:
        history.length,

      hasNextPage:
        false,

      hasPreviousPage:
        false,

    },

    runtimeMeta: {

      version: 1,

      runtime:
        "CHALLENGE_HISTORY_RUNTIME_V1",

      generatedAt:
        new Date().toISOString(),

    },

  };

};

export default {
  getHistoryRuntime,
};