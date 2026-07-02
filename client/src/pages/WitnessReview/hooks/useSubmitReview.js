 import { useState } from "react";

import {
  acceptInvitation,
  declineInvitation,
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

  const handleAccept = async ({
    token,
    name,
    phone,
  }) => {
    try {
      setLoading(true);
      setError("");

      await acceptInvitation({
        token,
        name,
        phone,
      });

      setDecision("ACCEPTED");
      setSuccess(true);
    } catch (error) {
      setError(
        error.response?.data?.message ||
          "Unable to accept invitation."
      );
    } finally {
      setLoading(false);
    }
  };

  const handleDecline = async (
    token
  ) => {
    try {
      setLoading(true);
      setError("");

      await declineInvitation(
        token
      );

      setDecision("DECLINED");
      setSuccess(true);
    } catch (error) {
      setError(
        error.response?.data?.message ||
          "Unable to decline invitation."
      );
    } finally {
      setLoading(false);
    }
  };

  return {
    handleAccept,
    handleDecline,
    loading,
    error,
    success,
    decision,
  };
};

export default useSubmitReview;