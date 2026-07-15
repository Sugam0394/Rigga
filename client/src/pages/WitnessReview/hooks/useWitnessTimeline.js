import { useCallback, useEffect, useState } from "react";

import {
  getWitnessTimeline,
} from "../api/reviewApi";

const useWitnessTimeline = (
  challengeId
) => {
  const [data, setData] = useState(null);

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState("");

  const fetchWitnessTimeline =
    useCallback(async () => {
      if (!challengeId) {
        setData(null);
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        setError("");

        const result =
          await getWitnessTimeline(
            challengeId
          );

        setData(result);

      } catch (err) {
        setError(
          err.response?.data?.message ||
            "Unable to load witness timeline."
        );
      } finally {
        setLoading(false);
      }
    }, [challengeId]);

  useEffect(() => {
    fetchWitnessTimeline();
  }, [fetchWitnessTimeline]);

  return {
    data,
    loading,
    error,
    refetch:
      fetchWitnessTimeline,
  };
};

export default useWitnessTimeline;