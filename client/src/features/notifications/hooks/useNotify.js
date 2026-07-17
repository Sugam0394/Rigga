import {
  useCallback,
  useEffect,
  useState,
} from "react";

import {
  getNotification,
} from "../api/notificationApi";

const useNotification = (
  notificationId
) => {

  const [
    notification,
    setNotification,
  ] = useState(null);

  const [
    loading,
    setLoading,
  ] = useState(true);

  const [
    error,
    setError,
  ] = useState(null);

  const fetchNotification =
    useCallback(
      async () => {

        if (!notificationId) {

          setNotification(null);
          setLoading(false);

          return;

        }

        try {

          setLoading(true);

          const response =
            await getNotification(
              notificationId
            );

          setNotification(
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
      [notificationId]
    );

  useEffect(() => {

    fetchNotification();

  }, [fetchNotification]);

  return {

    notification,

    loading,

    error,

    refetch:
      fetchNotification,

  };

};

export default useNotification;