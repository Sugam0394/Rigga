import {
  NOTIFICATION_EVENTS,
} from "../constants/notificationEvents.js";

const buildNotification = ({
  type,
}) => {
  switch (type) {

    case NOTIFICATION_EVENTS.CHALLENGE_CREATED:
      return {
        title:
          "Challenge Created",
        message:
          "Your challenge has been created successfully.",
      };

    case NOTIFICATION_EVENTS.PROGRESS_REPORT_SUBMITTED:
      return {
        title:
          "Progress Submitted",
        message:
          "Your progress report has been submitted.",
      };

    case NOTIFICATION_EVENTS.REMINDER_TRIGGERED:
      return {
        title:
          "Reminder Triggered",
        message:
          "Time to continue your commitment.",
      };

    case NOTIFICATION_EVENTS.CHALLENGE_UNDER_REVIEW:
      return {
        title:
          "Challenge Under Review",
        message:
          "Your challenge is now awaiting witness review.",
      };

    case NOTIFICATION_EVENTS.CHALLENGE_APPROVED:
      return {
        title:
          "Challenge Approved",
        message:
          "Your witness approved your challenge.",
      };

    case NOTIFICATION_EVENTS.CHALLENGE_REJECTED:
      return {
        title:
          "Challenge Rejected",
        message:
          "Your witness rejected your challenge. You may submit an appeal.",
      };

    case NOTIFICATION_EVENTS.APPEAL_SUBMITTED:
      return {
        title:
          "Appeal Submitted",
        message:
          "Your appeal has been submitted for final review.",
      };

    case NOTIFICATION_EVENTS.CHALLENGE_COMPLETED:
      return {
        title:
          "Challenge Completed",
        message:
          "Congratulations! Your challenge has been completed.",
      };

    case NOTIFICATION_EVENTS.CHALLENGE_FAILED:
      return {
        title:
          "Challenge Failed",
        message:
          "Your challenge has failed and the consequence was triggered.",
      };

    default:
      throw new Error(
        "Unsupported notification event"
      );
  }
};

export default {
  buildNotification,
};