import { useEffect, useState } from "react";

import {
  getWitnessAnalytics,
} from "../api/reviewApi";

const useWitnessAnalytics = (
  challengeId
) => {

  const [analytics, setAnalytics] =
    useState(null);

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState(null);

  useEffect(() => {

    const fetchAnalytics =
      async () => {

        try {

          const data =
            await getWitnessAnalytics(
              challengeId
            );

          setAnalytics(data);

        } catch (error) {

          setError(
            error.message
          );

        } finally {

          setLoading(false);

        }
      };

    fetchAnalytics();

  }, [challengeId]);

  return {
    analytics,
    loading,
    error,
  };
};

export default
  useWitnessAnalytics;