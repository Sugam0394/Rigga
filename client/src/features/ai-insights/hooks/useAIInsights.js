import {
  useEffect,
  useState,
} from "react";

import {
  getAIInsights,
} from "../api/aiInsightsApi";

const useAIInsights = (
  challengeId
) => {

  const [
    insights,
    setInsights,
  ] = useState(null);

  const [
    loading,
    setLoading,
  ] = useState(true);

  const [
    error,
    setError,
  ] = useState(null);

  useEffect(() => {

    const fetchInsights =
      async () => {

        try {

          setLoading(
            true
          );

          const data =
            await getAIInsights(
              challengeId
            );

          setInsights(
            data
          );

        } catch (err) {

          setError(
            err.message
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
      fetchInsights();
    }

  }, [challengeId]);

  return {
    insights,
    loading,
    error,
  };
};

export default useAIInsights;