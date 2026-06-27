import { NOTIFICATION_EVENTS } from "../constants/notificationEvents";

const getNotificationDestination = (
  notification
) => {
  const {
    type,
    entityId,
  } = notification;

  if (!entityId) {
    return null;
  }

  switch (type) {
    case NOTIFICATION_EVENTS.CHALLENGE_CREATED:
      return `/challenges/${entityId}`;

    case NOTIFICATION_EVENTS.PROGRESS_REPORT_SUBMITTED:
      return `/challenges/${entityId}`;

    case NOTIFICATION_EVENTS.REMINDER_TRIGGERED:
      return `/challenges/${entityId}/progress-report`;

    case NOTIFICATION_EVENTS.CHALLENGE_UNDER_REVIEW:
      return `/challenges/${entityId}`;

    case NOTIFICATION_EVENTS.CHALLENGE_APPROVED:
      return `/challenges/${entityId}`;

    case NOTIFICATION_EVENTS.CHALLENGE_REJECTED:
      return `/challenges/${entityId}/appeal`;

    case NOTIFICATION_EVENTS.APPEAL_SUBMITTED:
      return `/challenges/${entityId}`;

    case NOTIFICATION_EVENTS.CHALLENGE_COMPLETED:
      return `/challenges/${entityId}`;

    case NOTIFICATION_EVENTS.CHALLENGE_FAILED:
      return `/challenges/${entityId}`;

    default:
      return `/challenges/${entityId}`;
  }
};

export default getNotificationDestination;