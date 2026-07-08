import lifecycleCoordinator from "./lifecycleCoordinator.js";

const onInvitationAccepted = async ({
  challenge,
}) => {
  await lifecycleCoordinator.onChallengeActive(
    challenge
  );

  // Notification
  // Witness Analytics
};

const onInvitationDeclined = async ({
  challenge,
}) => {
  // Notification
  // Witness Analytics
};

 const onReviewSubmitted = async ({
  challenge,
  decision,
  appealed,
}) => {
  // Notification
  // Witness Analytics
};

const onAppealSubmitted = async ({
  challenge,
  appeal,
}) => {
  // Notification
  // Witness Analytics
};

export default {
  onInvitationAccepted,
  onInvitationDeclined,
  onReviewSubmitted,
  onAppealSubmitted,
};