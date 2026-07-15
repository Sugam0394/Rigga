import { useState } from "react";

import {
  acceptInvitation,
  declineInvitation,
} from "../api/reviewApi";

const useInvitationDecision = () => {
  const [loading, setLoading] = useState(false);

  const [error, setError] = useState("");

  const [success, setSuccess] = useState(false);

  const accept = async ({
    token,
    name,
    phone,
  }) => {
    try {
      setLoading(true);
      setError("");
      setSuccess(false);

      const data = await acceptInvitation({
        token,
        name,
        phone,
      });

      setSuccess(true);

      return data;
    } catch (err) {
      setError(
        err.response?.data?.message ||
          "Unable to accept invitation."
      );
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const decline = async (token) => {
    try {
      setLoading(true);
      setError("");
      setSuccess(false);

      const data = await declineInvitation(token);

      setSuccess(true);

      return data;
    } catch (err) {
      setError(
        err.response?.data?.message ||
          "Unable to decline invitation."
      );
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return {
    accept,
    decline,
    loading,
    error,
    success,
  };
};

export default useInvitationDecision;