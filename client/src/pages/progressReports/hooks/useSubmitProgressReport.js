import { useState } from "react";

import {
  submitProgressReport,
} from "../api/progressReportApi";

const useSubmitProgressReport =  () => {
    const [loading, setLoading] =
      useState(false);

    const [error, setError] =
      useState(null);

    const submit = async (
      reportData
    ) => {
      try {
        setLoading(true);
        setError(null);

        const report =
          await submitProgressReport(
            reportData
          );

        return report;
      } catch (err) {
        setError(
          err?.response?.data
            ?.message ||
            "Failed to submit progress report."
        );

        throw err;
      } finally {
        setLoading(false);
      }
    };

    return {
      submit,
      loading,
      error,
    };
  };

export default
  useSubmitProgressReport;