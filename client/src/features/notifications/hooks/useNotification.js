 import {
  useEffect,
  useState,
  useCallback,
} from "react";

import {
  getNotifications,
} from "../api/notificationApi";

import notificationRuntime
  from "../runTime/NotificationRunTime";

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
            err.response?.data?.message ??
            err.message
          );

        } finally {

          setLoading(false);

        }

      },
      []
    );

  useEffect(() => {

    fetchNotifications();

  }, [fetchNotifications]);

  useEffect(() => {

    const unsubscribe =
      notificationRuntime.subscribe(
        fetchNotifications
      );

    return unsubscribe;

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