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
  const fetchUnreadCount = async () => {
    try {
      const response =
        await getUnreadCount();

      setUnreadCount(
        response.data.count
      );
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

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
}, []);

  return {
    unreadCount,
    loading,
    error,
  };
};

export default useUnreadCount;

 

 