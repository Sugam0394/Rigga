import { NOTIFICATION_TYPES } from "../constants/notificationConstants.js";

const buildNotificationMessage = ({
  type,
  challengeTitle,
  userName,
}) => {
  switch (type) {
    case NOTIFICATION_TYPES.CHALLENGE_CREATED:
      return ` you have been  selected  as a witness for a Rigga challenge.`;

    case NOTIFICATION_TYPES.REVIEW_REQUIRED:
      return "A challenge assigned to you is ready for review.";

    case NOTIFICATION_TYPES.APPEAL_REVIEW_REQUIRED:
      return "A user has submitted an appeal and requires final review.";

    default:
      throw new Error("Unsupported notification type");
  }
};

export default {
  buildNotificationMessage,
};