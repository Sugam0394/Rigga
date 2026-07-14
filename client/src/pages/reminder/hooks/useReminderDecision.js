 import {
  useEffect,
  useState,
} from "react";

import {
  getReminderDecision,
} from "../api/reminderApi";

const useReminderDecision = (
  challengeId
) => {

  const [
    decision,
    setDecision,
  ] = useState(null);

  const [
    loading,
    setLoading,
  ] = useState(true);

  const [
    error,
    setError,
  ] = useState(null);

  const fetchReminderDecision =
    async () => {

      try {
        setLoading(true);
        setError(null);

        const data =
          await getReminderDecision(
            challengeId
          );

        setDecision(data);

      } catch (err) {

        setDecision(null);

        setError(
          err?.response?.data?.message ||
          err.message ||
          "Unable to load reminder decision."
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

    fetchReminderDecision();

  }, [challengeId]);

  return {

    decision,

    loading,

    error,

    refetch:
      fetchReminderDecision,

  };

};

export default
  useReminderDecision;