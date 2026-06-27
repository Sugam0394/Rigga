 import { Link } from "react-router-dom";

import useUnreadCount from "../hooks/useUnreadCount";

import NotificationBadge from "./NotificationBadge";

const NotificationBell = () => {
  const {
    unreadCount,
  } = useUnreadCount();

  return (
    <Link
      to="/notifications"
      aria-label="Notifications"
    >
      <span
        role="img"
        aria-hidden="true"
      >
        🔔
      </span>

      <NotificationBadge
        count={unreadCount}
      />
    </Link>
  );
};

export default NotificationBell;