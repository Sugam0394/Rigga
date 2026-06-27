 import {
  useCallback,
  useEffect,
  useState,
} from "react";

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

  const fetchUnreadCount =
    useCallback(async () => {
      try {
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
    }, []);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
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

  return {
    unreadCount,
    loading,
    error,
    refetch:
      fetchUnreadCount,
  };
};

export default useUnreadCount;

 

 