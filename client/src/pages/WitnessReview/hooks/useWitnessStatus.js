import { useCallback, useEffect, useState } from "react";

import {
  getWitnessStatus,
} from "../api/reviewApi";

const useWitnessStatus = (
  challengeId
) => {
  const [data, setData] = useState(null);

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState("");

  const fetchWitnessStatus =
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
          await getWitnessStatus(
            challengeId
          );

        setData(result);

      } catch (err) {
        setError(
          err.response?.data?.message ||
            "Unable to load witness status."
        );
      } finally {
        setLoading(false);
      }
    }, [challengeId]);

  useEffect(() => {
    fetchWitnessStatus();
  }, [fetchWitnessStatus]);

  return {
    data,
    loading,
    error,
    refetch:
      fetchWitnessStatus,
  };
};

export default useWitnessStatus;