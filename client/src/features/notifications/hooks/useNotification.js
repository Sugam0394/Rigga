import { useEffect, useState , useCallback} from "react";

import {
  getNotifications,
} from "../api/notificationApi";

const useNotifications = () => {
  const [
    notifications,
    setNotifications,
  ] = useState([]);

  const [
    loading,
    setLoading,
  ] = useState(true);

  const [
    error,
    setError,
  ] = useState(null);

  const fetchNotifications =
  useCallback(
    async () => {
      try {
        setLoading(true);

        const response =
          await getNotifications();

        setNotifications(
          response.data
        );

        setError(null);

      } catch (err) {
        setError(
          err.message
        );
      } finally {
        setLoading(false);
      }
    },
    []
  );

 useEffect(() => {
  const loadNotifications =
    async () => {
      await fetchNotifications();
    };

  loadNotifications();
}, [fetchNotifications]);

  return {
    notifications,
    loading,
    error,
    refetch:
      fetchNotifications,
  };
};

export default useNotifications;