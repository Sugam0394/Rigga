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
      <h1>
        Notifications
      </h1>

      <NotificationList
        notifications={
          notifications
        }
      />
    </main>
  );
};

export default NotificationsPage;