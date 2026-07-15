import { useCallback, useEffect, useState } from "react";

import {
  getReviewStatus,
} from "../api/witnessApi";

const useReviewStatus = (
  challengeId
) => {
  const [data, setData] = useState(null);

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState("");

  const fetchReviewStatus =
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
          await getReviewStatus(
            challengeId
          );

        setData(result);

      } catch (err) {
        setError(
          err.response?.data?.message ||
            "Unable to load review status."
        );
      } finally {
        setLoading(false);
      }
    }, [challengeId]);

  useEffect(() => {
    fetchReviewStatus();
  }, [fetchReviewStatus]);

  return {
    data,
    loading,
    error,
    refetch:
      fetchReviewStatus,
  };
};

export default useReviewStatus;