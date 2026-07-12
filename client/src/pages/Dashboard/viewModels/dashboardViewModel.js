 import VisualStateObjects
  from "../../../constants/VisualStateObjects.js";

 const buildImmediateActionViewModel = (
  immediateAction
) => {

  if (!immediateAction) {
    return null;
  }

 return {

  title:
    immediateAction.title,

  attentionState:
    VisualStateObjects
      .getAttentionState(
        immediateAction.type
      ),

};

}

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

 const buildTrustState = (
  status
) => {

  switch (status) {

    case "UNDER_REVIEW":
      return VisualStateObjects.getTrustState(
        "WITNESS_REVIEWING"
      );

    case "REJECTED":
      return VisualStateObjects.getTrustState(
        "WITNESS_REJECTED"
      );

    case "COMPLETED":
      return VisualStateObjects.getTrustState(
        "VERIFICATION_COMPLETE"
      );

    case "ACTIVE":
      return VisualStateObjects.getTrustState(
        "VERIFICATION_SCHEDULED"
      );

    case "APPEALED":
      return VisualStateObjects.getTrustState(
        "APPEAL_UNDER_REVIEW"
      );

    case "FAILED":
      return VisualStateObjects.getTrustState(
        "VERIFICATION_FAILED"
      );

    default:
      return null;

  }

};

const buildActiveCommitmentsViewModel = (
  commitments
) => {

  return commitments.map(
    commitment => ({

      ...commitment,

    status:
  VisualStateObjects
    .getLifecycleState(
      commitment.status
    ),

      deadlineLabel:
        formatDeadline(
          commitment.deadlineAt
        ),

      remaining:
        buildRemainingState(
          commitment.deadlineAt
        ),

      trustState:
  buildTrustState(
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