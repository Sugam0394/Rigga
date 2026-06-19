import { useState } from "react";

import {
  submitReview,
} from "../api/reviewApi";

const useSubmitReview = () => {

  const [loading, setLoading] =
    useState(false);

  const [error, setError] =
    useState("");

  const [success, setSuccess] =
    useState(false);

  const handleSubmit =
    async (payload) => {

      try {

        setLoading(true);

        setError("");

        await submitReview(
          payload
        );

        setSuccess(true);

      } catch (error) {

        setError(
          error.response?.data?.message ||
          "Review submission failed"
        );

      } finally {

        setLoading(false);

      }
    };

  return {
    handleSubmit,
    loading,
    error,
    success,
  };
};

export default useSubmitReview;