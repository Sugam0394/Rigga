 import challengeStatusLabels
  from "../../../constants/ChallengeStatusLabels.js";

const buildImmediateActionViewModel = (
  immediateAction
) => {

  if (!immediateAction) {
    return null;
  }

  const actionLabels = {

    REVIEW_REJECTION:
      "Review Rejection",

    WAIT_FOR_WITNESS:
      "Waiting For Witness",

    SUBMIT_PROGRESS:
      "Submit Progress Report",

    INVITE_WITNESS:
      "Invite Witness",
  };

  return {

    title:
      immediateAction.title,

    action:
      actionLabels[
        immediateAction.type
      ] ||
      immediateAction.type,

  };
};

const formatDeadline = (
  deadlineAt
) => {

  if (!deadlineAt) {
    return "No deadline";
  }

  return new Date(
    deadlineAt
  ).toLocaleDateString(
    "en-US",
    {
      day: "numeric",
      month: "short",
      year: "numeric",
    }
  );
};

const buildRemainingState = (
  deadlineAt
) => {

  if (!deadlineAt) {
    return {
      label: "",
      variant: "",
    };
  }

  const deadline =
    new Date(deadlineAt);

  const today =
    new Date();

  const remainingDays =
    Math.ceil(
      (
        deadline -
        today
      ) /
      (
        1000 *
        60 *
        60 *
        24
      )
    );

  if (
    remainingDays <= 0
  ) {
    return {
      label:
        "Deadline Passed",
      variant:
        "danger",
    };
  }

  if (
    remainingDays <= 2
  ) {
    return {
      label:
        `${remainingDays} Days Remaining`,
      variant:
        "urgent",
    };
  }

  return {
    label:
      `${remainingDays} Days Remaining`,
    variant:
      "default",
  };
};

const buildWitnessLabel = (
  status
) => {

  switch (status) {

    case "UNDER_REVIEW":
      return "Witness Reviewing";

    case "REJECTED":
      return "Witness Rejected";

    case "COMPLETED":
      return "Verification Complete";

    case "ACTIVE":
      return "Verification Scheduled";

    case "APPEALED":
      return "Appeal Under Review";

    case "FAILED":
      return "Verification Failed";

    default:
      return "Verification Pending";
  }

};

const buildActiveCommitmentsViewModel = (
  commitments
) => {

  return commitments.map(
    commitment => ({

      ...commitment,

      statusLabel:
        challengeStatusLabels[
          commitment.status
        ] ||
        commitment.status,

      deadlineLabel:
        formatDeadline(
          commitment.deadlineAt
        ),

      remaining:
        buildRemainingState(
          commitment.deadlineAt
        ),

      witnessLabel:
        buildWitnessLabel(
          commitment.status
        ),

    })
  );
};

const buildDashboardViewModel = (
  dashboard
) => {

  if (!dashboard) {
    return null;
  }

  return {

    summary:
      dashboard.summary,

    immediateAction:
      buildImmediateActionViewModel(
        dashboard.immediateAction
      ),

    activeCommitments:
      buildActiveCommitmentsViewModel(
        dashboard.activeCommitments
      ),

    dashboardMeta:
      dashboard.dashboardMeta,

  };
};

export default {
  buildDashboardViewModel,
};