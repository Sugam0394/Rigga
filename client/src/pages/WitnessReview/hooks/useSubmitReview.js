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

  const [decision, setDecision] =
    useState("");

  const handleSubmitReview = async ({
    token,
    decision,
    rejectionReason = "",
  }) => {
    try {
      setLoading(true);
      setError("");

      await submitReview({
        token,
        decision,
        rejectionReason,
      });

      setDecision(decision);
      setSuccess(true);
    } catch (error) {
      setError(
        error.response?.data?.message ||
        "Unable to submit review."
      );
    } finally {
      setLoading(false);
    }
  };

  return {
    handleSubmitReview,
    loading,
    error,
    success,
    decision,
  };
};

export default useSubmitReview;