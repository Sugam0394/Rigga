 import { Link } from "react-router-dom";

import useUnreadCount from "../hooks/useUnreadCount";

import NotificationBadge from "./NotificationBadge";


import "./NotificationBell.css"
const NotificationBell = () => {
  const {
    unreadCount,
  } = useUnreadCount();

  return (
    <Link
      to="/notifications"
      className="notification-bell"
      aria-label="Notifications"
    >
      <span
        className="notification-bell__icon"
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