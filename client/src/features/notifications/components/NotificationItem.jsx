 import { useNavigate } from "react-router-dom";

import useMarkNotificationRead from "../hooks/useNotificationRead";

import getNotificationDestination from "../utils/getNotificationDestination";
import formatNotificationTime from "../utils/formatNotificationTime";

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
      role="button"
      tabIndex={0}
      onClick={handleClick}
      onKeyDown={
        handleKeyDown
      }
      aria-label={
        notification.title
      }
      aria-disabled={loading}
      data-read={
        notification.isRead
      }
    >
      <h3>
        {notification.title}
      </h3>

      <p>
        {notification.message}
      </p>

      <small>
        {formatNotificationTime(
          notification.createdAt
        )}
      </small>
    </article>
  );
};

export default NotificationItem;