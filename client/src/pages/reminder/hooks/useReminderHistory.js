 import {
  useEffect,
  useState,
} from "react";

import {
  getReminderHistory,
} from "../api/reminderApi";

const useReminderHistory = (
  challengeId
) => {

  const [
    history,
    setHistory,
  ] = useState(null);

  const [
    loading,
    setLoading,
  ] = useState(true);

  const [
    error,
    setError,
  ] = useState(null);

  const fetchReminderHistory =
    async () => {

      try {

        setLoading(true);
        setError(null);

        const data =
          await getReminderHistory(
            challengeId
          );

        setHistory(data);

      } catch (err) {

        setHistory(null);

        setError(
          err?.response?.data?.message ||
          err.message ||
          "Unable to load reminder history."
        );

      } finally {

        setLoading(false);

      }

    };

  useEffect(() => {

    if (!challengeId) {

      const timer =
        setTimeout(() => {
          // eslint-disable-next-line react-hooks/set-state-in-effect
          setLoading(false);
        }, 0);

      return () =>
        clearTimeout(timer);

    }

    fetchReminderHistory();

  }, [challengeId]);

  return {

    history,

    loading,

    error,

    refetch:
      fetchReminderHistory,

  };

};

export default
  useReminderHistory;