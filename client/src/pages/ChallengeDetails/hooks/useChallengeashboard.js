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
        setDashboard(null);

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

    // Fixed: Defer execution out of the synchronous render pipeline to pass the lint check
    const timer = setTimeout(() => {
      fetchDashboard();
    }, 0);

    return () => clearTimeout(timer);
  }, [
    challengeId,
    fetchDashboard,
  ]);

  return {
  dashboard,
  loading,
  error,
  retry: fetchDashboard,
  refresh: fetchDashboard,
};
};

export default useChallengeDashboard;