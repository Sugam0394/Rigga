import { useEffect, useState }
  from "react";

import {
  getProgressReports,
} from "../api/progressReportApi";

const useProgressReports = (
  challengeId
) => {
  const [reports, setReports] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState(null);

  const fetchReports =
    async () => {
      try {
        setLoading(true);
        setError(null);

        const data =
          await getProgressReports(
            challengeId
          );

        setReports(data);
      } catch (err) {
        setError(
          err?.response?.data
            ?.message ||
            "Failed to load reports"
        );
      } finally {
        setLoading(false);
      }
    };

  useEffect(() => {
    if (challengeId) {
      fetchReports();
    }
  }, [challengeId]);

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