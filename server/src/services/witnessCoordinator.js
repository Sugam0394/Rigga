 import lifecycleCoordinator from "./lifecycleCoordinator.js";

const onInvitationAccepted = async ({
  challenge,
}) => {
  try {
    await lifecycleCoordinator.onChallengeActive(
      challenge
    );

    // Notification

    // Witness Analytics
  } catch (error) {
    console.error(
      "[WITNESS COORDINATOR][INVITATION_ACCEPTED]",
      error
    );
    throw error;
  }
};

const onInvitationDeclined = async ({
  challenge,
}) => {
  try {
    // Notification

    // Witness Analytics
  } catch (error) {
    console.error(
      "[WITNESS COORDINATOR][INVITATION_DECLINED]",
      error
    );
    throw error;
  }
};

const onReviewSubmitted = async ({
  challenge,
  decision,
  appealed,
}) => {
  try {
    // Notification

    // Consequence

    // Witness Analytics
  } catch (error) {
    console.error(
      "[WITNESS COORDINATOR][REVIEW_SUBMITTED]",
      error
    );
    throw error;
  }
};

const onAppealSubmitted = async ({
  challenge,
  appeal,
}) => {
  try {
    // Notification

    // Witness Analytics
  } catch (error) {
    console.error(
      "[WITNESS COORDINATOR][APPEAL_SUBMITTED]",
      error
    );
    throw error;
  }
};

export default {
  onInvitationAccepted,
  onInvitationDeclined,
  onReviewSubmitted,
  onAppealSubmitted,
};