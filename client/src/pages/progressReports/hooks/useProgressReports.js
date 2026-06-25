 import {
  useCallback,
  useEffect,
  useState,
} from "react";

import {
  getProgressReports,
} from "../api/progressReportApi";

const useProgressReports = (
  challengeId
) => {
  const [
    reports,
    setReports,
  ] = useState([]);

  const [
    loading,
    setLoading,
  ] = useState(true);

  const [
    error,
    setError,
  ] = useState(null);

  // Wrapped in useCallback so its reference remains completely stable across renders
  const fetchReports =
    useCallback(async () => {
      try {
        setLoading(true);
        setError(null);

        const data =
          await getProgressReports(
            challengeId
          );

        setReports(
          data ?? []
        );

      } catch (err) {
        setReports([]);

        setError(
          err?.response?.data
            ?.message ||
          "Failed to load reports."
        );

      } finally {
        setLoading(false);
      }
    }, [challengeId]);

  useEffect(() => {
    if (!challengeId) {
      const timer = setTimeout(() => {
        setLoading(false);
      }, 0);
      return () => clearTimeout(timer);
    }

    fetchReports();

  }, [challengeId, fetchReports]); // Perfectly safe dependency array now

  return {
    reports,
    loading,
    error,
    retry:
      fetchReports,
  };
};

export default
  useProgressReports;