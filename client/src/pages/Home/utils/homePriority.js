export const getChallengePriority = (
  challenge
) => {
  switch (
    challenge.status
  ) {
    case "REJECTED":
      return 100;

    case "UNDER_REVIEW":
      return 80;

    case "APPEALED":
      return 70;

    case "ACTIVE":
      return 50;

    case "FAILED":
      return 20;

    case "COMPLETED":
      return 10;

    default:
      return 0;
  }
};

export const getDeadlinePriority = (
  deadlineAt
) => {
  const deadline =
    new Date(deadlineAt);

  const today =
    new Date();

  const daysRemaining =
    Math.ceil(
      (deadline - today) /
        (1000 *
          60 *
          60 *
          24)
    );

  if (
    daysRemaining <= 0
  ) {
    return {
      score: 50,
      label:
        "Due Today",
    };
  }

  if (
    daysRemaining <= 7
  ) {
    return {
      score: 30,
      label:
        "Due This Week",
    };
  }

  return {
    score: 10,
    label:
      "Upcoming",
  };
};

export const getNextAction = (challenge) => {
    switch (
      challenge.status
    ) {
      case "ACTIVE":
        return "Submit Progress Report";

      case "UNDER_REVIEW":
        return "Await Witness Decision";

      case "REJECTED":
        return "Review Rejection";

      case "APPEALED":
        return "Await Appeal Outcome";

      case "FAILED":
        return "Challenge Closed";

      case "COMPLETED":
        return "Challenge Completed";

      default:
        return "Review Status";
    }
  };

  export const sortChallenges =  (challenges) => {
    return [
      ...challenges,
    ].sort(
      (a, b) => {
        const aPriority =
          getChallengePriority(
            a
          ) +
          getDeadlinePriority(
            a.deadlineAt
          ).score;

        const bPriority =
          getChallengePriority(
            b
          ) +
          getDeadlinePriority(
            b.deadlineAt
          ).score;

        return (
          bPriority -
          aPriority
        );
      }
    );
  };
export const generateFocusItems =  (challenges) => {
    const items = [];

    challenges.forEach(
      (
        challenge
      ) => {
        const deadline =
          getDeadlinePriority(
            challenge.deadlineAt
          );

        if (
          challenge.status ===
          "REJECTED"
        ) {
          items.push({
            title:
              challenge.title,
            action:
              "Review Rejection",
          });
        }

        else if (
          challenge.status ===
          "UNDER_REVIEW"
        ) {
          items.push({
            title:
              challenge.title,
            action:
              "Witness Review Pending",
          });
        }

        else if (
          deadline.label ===
          "Due Today"
        ) {
          items.push({
            title:
              challenge.title,
            action:
              "Deadline Today",
          });
        }

        else if (
          deadline.label ===
          "Due This Week"
        ) {
          items.push({
            title:
              challenge.title,
            action:
              "Deadline This Week",
          });
        }
      }
    );

    return items.slice(
      0,
      3
    );
  };

  export const getUrgencyContext = (
  deadlineAt
) => {
  const deadline =
    new Date(deadlineAt);

  const today =
    new Date();

  const days =
    Math.ceil(
      (deadline - today) /
      (1000 * 60 * 60 * 24)
    );

  if (days <= 0)
    return "Requires attention today";

  if (days <= 2)
    return "Deadline approaching";

  if (days <= 7)
    return "Due this week";

  return "On track";
};
