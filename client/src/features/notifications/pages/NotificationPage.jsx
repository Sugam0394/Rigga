import useNotifications from "../hooks/useNotification";
import NotificationEmptyState from "../components/NotificationEmptyState";
import NotificationList from "../components/NotificationList";
import NotificationLoadingState from "../components/NotificationLoadingState";
import NotificationErrorState from "../components/NotificationErrorState";
 import { Link }  from "react-router-dom";
import { markAllNotificationsRead } from "../api/notificationApi";
import { useEffect } from "react";
import {   useRef } from "react";
const NotificationsPage = () => {


  const {
    notifications,
    loading,
    error,
  } = useNotifications();

const hasMarkedRead =
  useRef(false);
 useEffect(() => {
  if (
    loading ||
    notifications.length === 0 ||
    hasMarkedRead.current
  ) {
    return;
  }

  const markAllRead =
    async () => {
      try {
        await markAllNotificationsRead();

        hasMarkedRead.current =
          true;

      } catch (error) {
        console.error(error);
      }
    };

  markAllRead();
}, [
  loading,
  notifications,
]);

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
        notifications={
          notifications
        }
      />
    </main>
  );
};

export default NotificationsPage;