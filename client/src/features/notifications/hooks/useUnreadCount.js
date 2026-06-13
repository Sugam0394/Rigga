 import { useEffect, useState } from "react";

import {
  getUnreadCount,
} from "../api/notificationApi";

const useUnreadCount = () => {
  const [
    unreadCount,
    setUnreadCount,
  ] = useState(0);

  const [
    loading,
    setLoading,
  ] = useState(true);

  const [
    error,
    setError,
  ] = useState(null);

  useEffect(() => {
    const fetchUnreadCount =
      async () => {
        try {
          setLoading(true);

          const response =
            await getUnreadCount();

          setUnreadCount(
            response.data.count
          );

          setError(null);

        } catch (err) {
          setError(
            err.message
          );
        } finally {
          setLoading(false);
        }
      };

    fetchUnreadCount();
  }, []);

  return {
    unreadCount,
    loading,
    error,
  };
};

export default useUnreadCount;