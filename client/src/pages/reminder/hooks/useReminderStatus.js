 import {
  useEffect,
  useState,
} from "react";

import {
  getReminderStatus,
} from "../api/reminderApi";

const useReminderStatus = (
  challengeId
) => {

  const [
    status,
    setStatus,
  ] = useState(null);

  const [
    loading,
    setLoading,
  ] = useState(true);

  const [
    error,
    setError,
  ] = useState(null);

  const fetchReminderStatus =
    async () => {

      try {

        setLoading(true);
        setError(null);

        const data =
          await getReminderStatus(
            challengeId
          );

        setStatus(data);

      } catch (err) {

        setStatus(null);

        setError(
          err?.response?.data?.message ||
          err.message ||
          "Unable to load reminder status."
        );

      } finally {

        setLoading(false);

      }

    };

  useEffect(() => {

    if (!challengeId) {

      const timer =
        setTimeout(() => {
          setLoading(false);
        }, 0);

      return () =>
        clearTimeout(timer);

    }

    fetchReminderStatus();

  }, [challengeId]);

  return {

    status,

    loading,

    error,

    refetch:
      fetchReminderStatus,

  };

};

export default
  useReminderStatus;