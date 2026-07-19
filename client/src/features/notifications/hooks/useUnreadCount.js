 import {
  useCallback,
  useEffect,
  useState,
} from "react";

import {
  getUnreadCount,
} from "../api/notificationApi";

import notificationRuntime
  from "../runTime/NotificationRunTime";

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

  const fetchUnreadCount =
    useCallback(
      async () => {

        try {

          const response =
            await getUnreadCount();

          setUnreadCount(
            response.data.count
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

    fetchUnreadCount();

    const interval =
      setInterval(
        fetchUnreadCount,
        5000
      );

    return () =>
      clearInterval(
        interval
      );

  }, [fetchUnreadCount]);

  useEffect(() => {

    const unsubscribe =
      notificationRuntime.subscribe(
        fetchUnreadCount
      );

    return unsubscribe;

  }, [fetchUnreadCount]);

  return {

    unreadCount,

    loading,

    error,

    refetch:
      fetchUnreadCount,

  };

};

export default useUnreadCount;

 

 