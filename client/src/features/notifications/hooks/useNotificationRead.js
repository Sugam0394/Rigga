import { useState } from "react";

import {
  markNotificationRead,
} from "../api/notificationApi";

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

        return response;

      } catch (err) {
        setError(
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