 import { useState } from "react";

import {
  markAllNotificationsRead,
} from "../api/notificationApi";

import notificationRuntime
  from "../runtime/notificationRuntime";

const useMarkAllNotificationsRead = () => {

  const [
    loading,
    setLoading,
  ] = useState(false);

  const [
    error,
    setError,
  ] = useState(null);

  const markAllAsRead =
    async () => {

      try {

        setLoading(true);

        const response =
          await markAllNotificationsRead();

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

    markAllAsRead,

    loading,

    error,

  };

};

export default useMarkAllNotificationsRead;