 import { Link } from "react-router-dom";

import useNotifications from "../hooks/useNotification";
import useMarkAllNotificationsRead from "../hooks/useMarkNotificationRead";
import useNotificationSummary from "../hooks/useNotificationSummary";

import NotificationEmptyState from "../components/NotificationEmptyState";
import NotificationList from "../components/NotificationList";
import NotificationLoadingState from "../components/NotificationLoadingState";
import NotificationErrorState from "../components/NotificationErrorState";

import "./NotificationPage.css";

const NotificationsPage = () => {
  const {
    notifications,
    loading,
    error,
    refetch,
  } = useNotifications();

  const {
    markAllAsRead,
    loading: markAllLoading,
  } =
    useMarkAllNotificationsRead();

  const {
    summary,
    refetch: refetchSummary,
  } =
    useNotificationSummary();

  const handleMarkAllRead =
    async () => {

      await markAllAsRead();

      await refetch();

      await refetchSummary();
    };

  const handleNotificationRead =
    async () => {

      await refetch();

      await refetchSummary();
    };

  if (loading) {
    return (
      <NotificationLoadingState />
    );
  }

  if (error) {
    return (
      <NotificationErrorState
        message={error}
        onRetry={refetch}
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

          <div>

            <h1 className="notifications-page__title">
              Notifications
            </h1>

            <p className="notifications-page__subtitle">
              Stay informed about every
              accountability update.
            </p>

            {summary && (
              <p className="notifications-page__summary">

                Total:
                {" "}
                {summary.totalNotifications}

                {" • "}

                Unread:
                {" "}
                {summary.unreadNotifications}

              </p>
            )}

          </div>

          <button
            type="button"
            onClick={handleMarkAllRead}
            disabled={markAllLoading}
            className="notifications-page__mark-all"
          >
            Mark All Read
          </button>

        </header>

        <NotificationList
          notifications={notifications}
          onNotificationRead={
            handleNotificationRead
          }
        />

      </div>

    </main>
  );
};

export default NotificationsPage;