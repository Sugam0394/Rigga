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
          setError("");

          const summary =
            await getReviewSummary(
              token
            );

          setData(summary);

        } catch (error) {

          const status =
            error.response?.status;

          const message =
            error.response?.data?.message;

          if (status === 401) {
            setError(
              message ||
                "This review link is no longer available."
            );

          } else if (status === 404) {
            setError(
              "We couldn't find this review invitation."
            );

          } else if (!error.response) {
            setError(
              "You're currently offline. Please check your internet connection and try again."
            );

          } else {
            setError(
              message ||
                "We couldn't load this review right now. Please try again."
            );
          }

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