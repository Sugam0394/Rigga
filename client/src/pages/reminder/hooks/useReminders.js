import {
  useEffect,
  useState,
} from "react";

import {
  getChallengeReminders,
} from "../api/reminderApi";

const useReminders = (
  challengeId
) => {

  const [
    reminders,
    setReminders,
  ] = useState(null);

  const [
    loading,
    setLoading,
  ] = useState(true);

  const [
    error,
    setError,
  ] = useState(null);

  const fetchReminders =
    async () => {

      try {

        setLoading(true);
        setError(null);

        const data =
          await getChallengeReminders(
            challengeId
          );

        setReminders(data);

      } catch (err) {

        setReminders(null);

        setError(
          err?.response?.data?.message ||
          err.message ||
          "Unable to load reminders."
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

    fetchReminders();

  }, [challengeId]);

  return {

    reminders,

    loading,

    error,

    refetch:
      fetchReminders,

  };

};

export default
  useReminders;