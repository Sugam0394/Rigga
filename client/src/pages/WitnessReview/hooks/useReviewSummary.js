 import { useEffect, useState } from "react";

import {
  getInvitation,
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
    const loadInvitation =
      async () => {
        try {
          setLoading(true);

          const invitation =
            await getInvitation(
              token
            );

          setData(invitation);
        } catch (error) {
          setError(
            error.response?.data?.message ||
              "Failed to load invitation."
          );
        } finally {
          setLoading(false);
        }
      };

    if (token) {
      loadInvitation();
    }
  }, [token]);

  return {
    data,
    loading,
    error,
  };
};

export default useReviewSummary;