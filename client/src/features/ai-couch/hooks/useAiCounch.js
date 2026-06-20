import {
  useEffect,
  useState,
} from "react";

import {
  getAICoach,
} from "../api/aiCouchApi";

const useAICoach = (
  challengeId
) => {

  const [
    coach,
    setCoach,
  ] = useState(null);

  const [
    loading,
    setLoading,
  ] = useState(true);

  const [
    error,
    setError,
  ] = useState("");

  useEffect(() => {

    const fetchCoach =
      async () => {

        try {

          setLoading(
            true
          );

          setError("");

          const data =
            await getAICoach(
              challengeId
            );

          setCoach(
            data
          );

        } catch (err) {

          setError(
            err.response
              ?.data
              ?.message ||
            "Unable to load AI coach."
          );

        } finally {

          setLoading(
            false
          );
        }
      };

    if (
      challengeId
    ) {
      fetchCoach();
    }

  }, [challengeId]);

  return {
    coach,
    loading,
    error,
  };
};

export default
  useAICoach;