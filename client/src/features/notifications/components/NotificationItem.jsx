 import { useNavigate } from "react-router-dom";

import useMarkNotificationRead from "../hooks/useNotificationRead";

import getNotificationDestination from "../utils/getNotificationDestination";
import formatNotificationTime from "../utils/formatNotificationTime";
import "./NotificationItem.css"


const NotificationItem = ({
  notification,
  onNotificationRead,
}) => {
  const navigate = useNavigate();

  const {
    markAsRead,
    loading,
  } = useMarkNotificationRead();

  const handleClick = async () => {
    if (loading) {
      return;
    }

    try {
      if (!notification.isRead) {
        await markAsRead(
          notification._id
        );

        if (onNotificationRead) {
          await onNotificationRead();
        }
      }

      const destination =
        getNotificationDestination(
          notification
        );

      if (destination) {
        navigate(destination);
      }
    } catch (error) {
      console.error(
        "Failed to open notification.",
        error
      );
    }
  };

  const handleKeyDown = (
    event
  ) => {
    if (
      event.key === "Enter" ||
      event.key === " "
    ) {
      event.preventDefault();
      handleClick();
    }
  };
 return (
  <article
    className={`notification-card ${
      notification.isRead
        ? "notification-card--read"
        : "notification-card--unread"
    }`}
    role="button"
    tabIndex={0}
    onClick={handleClick}
    onKeyDown={handleKeyDown}
    aria-label={notification.title}
    aria-disabled={loading}
  >
    <div className="notification-card__content">
      <h3 className="notification-card__title">
        {notification.title}
      </h3>

      <p className="notification-card__message">
        {notification.message}
      </p>

      <small className="notification-card__time">
        {formatNotificationTime(
          notification.createdAt
        )}
      </small>
    </div>
  </article>
);
};

export default NotificationItem;