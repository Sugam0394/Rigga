import { useCallback, useEffect, useState } from "react";

import {
  getChallengeDashboard,
} from "../api/dashboardApi";

const useChallengeDashboard = (
  challengeId
) => {
  const [dashboard, setDashboard] =
    useState(null);

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState(null);

  const fetchDashboard =
    useCallback(async () => {
      try {
        setLoading(true);
        setError(null);

        const data =
          await getChallengeDashboard(
            challengeId
          );

        setDashboard(data);
      } catch (err) {
        setError(
          err?.response?.data?.message ||
            "Failed to load challenge."
        );
      } finally {
        setLoading(false);
      }
    }, [challengeId]);

  useEffect(() => {
    if (!challengeId) return;

    fetchDashboard();
  }, [
    challengeId,
    fetchDashboard,
  ]);

  return {
    dashboard,
    loading,
    error,
    retry: fetchDashboard,
  };
};

export default useChallengeDashboard;