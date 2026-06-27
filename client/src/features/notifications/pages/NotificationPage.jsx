 import { Link } from "react-router-dom";

import useNotifications from "../hooks/useNotification";

import NotificationEmptyState from "../components/NotificationEmptyState";
import NotificationList from "../components/NotificationList";
import NotificationLoadingState from "../components/NotificationLoadingState";
import NotificationErrorState from "../components/NotificationErrorState";

import "./NotificationPage.css"
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
  <main className="notifications-page">
    <div className="notifications-page__container">

      <Link
        to="/home"
        className="notifications-page__back"
      >
        ← Back
      </Link>

      <header className="notifications-page__header">
        <h1 className="notifications-page__title">
          Notifications
        </h1>

        <p className="notifications-page__subtitle">
          Stay informed about every
          accountability update.
        </p>
      </header>

      <NotificationList
        notifications={notifications}
        onNotificationRead={refetch}
      />
    </div>
  </main>
);
};

export default NotificationsPage;