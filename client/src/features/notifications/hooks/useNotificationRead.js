 import { useState } from "react";

import {
  markNotificationRead,
} from "../api/notificationApi";

import notificationRuntime
  from "../runTime/NotificationRunTime";

const useMarkNotificationRead = () => {

  const [
    loading,
    setLoading,
  ] = useState(false);

  const [
    error,
    setError,
  ] = useState(null);

  const markAsRead =
    async (notificationId) => {

      try {

        setLoading(true);

        const response =
          await markNotificationRead(
            notificationId
          );

        setError(null);

        // NF3.4
        // Synchronize all notification
        // runtime consumers.
        notificationRuntime.notify();

        return response;

      } catch (err) {

        setError(
          err.response?.data?.message ??
          err.message
        );

        throw err;

      } finally {

        setLoading(false);

      }

    };

  return {

    markAsRead,

    loading,

    error,

  };

};

export default useMarkNotificationRead;