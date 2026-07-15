import { useCallback, useEffect, useState } from "react";

import {
  getAppealStatus,
} from "../api/witnessApi";

const useAppealStatus = (
  challengeId
) => {
  const [data, setData] = useState(null);

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState("");

  const fetchAppealStatus =
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
          await getAppealStatus(
            challengeId
          );

        setData(result);

      } catch (err) {
        setError(
          err.response?.data?.message ||
            "Unable to load appeal status."
        );
      } finally {
        setLoading(false);
      }
    }, [challengeId]);

  useEffect(() => {
    fetchAppealStatus();
  }, [fetchAppealStatus]);

  return {
    data,
    loading,
    error,
    refetch:
      fetchAppealStatus,
  };
};

export default useAppealStatus;