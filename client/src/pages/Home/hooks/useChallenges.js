 import { useCallback, useState } from "react";
import { getChallenges } from "../api/challengeApi";

export const useChallenges = () => {
  const [challenges, setChallenges] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchChallenges = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const data = await getChallenges();

      setChallenges(data);
    } catch (err) {
      setError(
        err?.response?.data?.message ||
        "Something went wrong"
      );
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    challenges,
    loading,
    error,
    refetch: fetchChallenges,
  };
};