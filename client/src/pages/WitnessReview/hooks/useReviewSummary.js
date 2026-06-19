import { useEffect, useState } from "react";

import {
  getReviewSummary,
} from "../api/reviewApi";

const useReviewSummary = (
  challengeId
) => {

  const [data, setData] =
    useState(null);

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState("");

  useEffect(() => {

    const loadSummary =
      async () => {

        try {

          setLoading(true);

          const summary =
            await getReviewSummary(
              challengeId
            );

          setData(summary);

        } catch (error) {

          setError(
            error.response?.data?.message ||
            "Failed to load review"
          );

        } finally {

          setLoading(false);

        }
      };

    if (challengeId) {
      loadSummary();
    }

  }, [challengeId]);

  return {
    data,
    loading,
    error,
  };
};

export default useReviewSummary;