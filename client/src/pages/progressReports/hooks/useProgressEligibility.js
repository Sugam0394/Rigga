import {
  useEffect,
  useState,
} from "react";

import {
  getProgressEligibility,
} from "../api/progressReportApi";

const useProgressEligibility = (
  challengeId
) => {

  const [
    eligibility,
    setEligibility,
  ] = useState(null);

  const [
    loading,
    setLoading,
  ] = useState(true);

  const [
  error,
  setError,
] = useState(null);

  useEffect(() => {

    const fetchEligibility =
      async () => {

        try {

          const data =
            await getProgressEligibility(
              challengeId
            );

          setEligibility(
            data
          );

        } catch (err) {

          setError(
            err.message
          );

        } finally {

          setLoading(
            false
          );

        }
      };

    if (challengeId) {
      fetchEligibility();
    }

  }, [challengeId]);

  return {
    eligibility,
    loading,
    error,
  };
};

export default
  useProgressEligibility;