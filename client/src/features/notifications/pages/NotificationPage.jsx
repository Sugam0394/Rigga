 import { Link } from "react-router-dom";

import useNotifications from "../hooks/useNotification";

import NotificationEmptyState from "../components/NotificationEmptyState";
import NotificationList from "../components/NotificationList";
import NotificationLoadingState from "../components/NotificationLoadingState";
import NotificationErrorState from "../components/NotificationErrorState";

const NotificationsPage = () => {
  const {
    notifications,
    loading,
    error,
    refetch,
  } = useNotifications();

  if (loading) {
    return (
      <NotificationLoadingState />
    );
  }

  if (error) {
    return (
      <NotificationErrorState
        message={error}
      />
    );
  }

  if (
    notifications.length === 0
  ) {
    return (
      <NotificationEmptyState />
    );
  }

  return (
    <main>
      <Link to="/home">
        Back
      </Link>

      <h1>
        Notifications
      </h1>

      <NotificationList
        notifications={notifications}
        onNotificationRead={refetch}
      />
    </main>
  );
};

export default NotificationsPage;