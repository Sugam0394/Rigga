 import {
  useCallback,
  useEffect,
  useState,
} from "react";

import {
  getNotificationSummary,
} from "../api/notificationApi";

import notificationRuntime
  from "../runtime/notificationRuntime";

const useNotificationSummary = () => {

  const [
    summary,
    setSummary,
  ] = useState(null);

  const [
    loading,
    setLoading,
  ] = useState(true);

  const [
    error,
    setError,
  ] = useState(null);

  const fetchSummary =
    useCallback(
      async () => {

        try {

          setLoading(true);

          const response =
            await getNotificationSummary();

          setSummary(
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

    fetchSummary();

  }, [fetchSummary]);

  useEffect(() => {

    const unsubscribe =
      notificationRuntime.subscribe(
        fetchSummary
      );

    return unsubscribe;

  }, [fetchSummary]);

  return {

    summary,

    loading,

    error,

    refetch:
      fetchSummary,

  };

};

export default useNotificationSummary;