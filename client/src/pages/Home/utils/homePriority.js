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


 export const determineImmediateAction = (
  challenges
) => {

  const rejected =
    challenges.find(
      challenge =>
        challenge.status ===
        "REJECTED"
    );

  if (rejected) {
    return {
      title:
        rejected.title,
      action:
        "Review Rejection",
    };
  }

  const active =
    challenges.find(
      challenge =>
        challenge.status ===
        "ACTIVE"
    );

  if (active) {
    return {
      title:
        active.title,
      action:
        "Submit Progress Report",
    };
  }

  const dueToday =
    challenges.find(
      challenge =>
        getDeadlinePriority(
          challenge.deadlineAt
        ).label ===
        "Due Today"
    );

  if (dueToday) {
    return {
      title:
        dueToday.title,
      action:
        "Deadline Today",
    };
  }

  return {
    title:
      "Everything On Track",
    action:
      "No immediate action required",
  };
};

 

 export const getWitnessState = (
  challenge
) => {

  if (
    challenge.status ===
    "UNDER_REVIEW"
  ) {
    return "Witness Reviewing";
  }

  if (
    challenge.status ===
    "REJECTED"
  ) {
    return "Witness Rejected";
  }

  if (
    challenge.status ===
    "COMPLETED"
  ) {
    return "Verification Complete";
  }

  if (
    challenge.status ===
    "ACTIVE"
  ) {
    return "Verification Scheduled";
  }

  if (
    challenge.status ===
    "APPEALED"
  ) {
    return "Appeal Under Review";
  }

  if (
    challenge.status ===
    "FAILED"
  ) {
    return "Verification Failed";
  }

  return "Verification Pending";
};
