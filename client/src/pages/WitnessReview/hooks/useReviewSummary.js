 import { useEffect, useState } from "react";

import {
  getReviewSummary,
} from "../api/reviewApi";

const useReviewSummary = (
  token
) => {
  const [data, setData] =
    useState(null);

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState("");

  useEffect(() => {
    const loadReviewSummary =
      async () => {
        try {
          setLoading(true);

          const summary =
            await getReviewSummary(
              token
            );

          setData(summary);
        } catch (error) {
          setError(
            error.response?.data?.message ||
              "Failed to load review."
          );
        } finally {
          setLoading(false);
        }
      };

    if (token) {
      loadReviewSummary();
    }
  }, [token]);

  return {
    data,
    loading,
    error,
  };
};

export default useReviewSummary;