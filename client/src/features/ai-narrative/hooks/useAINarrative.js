import {
  useEffect,
  useState,
} from "react";

import {
  getAINarrative,
} from "../api/aiNarrativeApi";

const useAINarrative = (
  challengeId
) => {

  const [
    narrative,
    setNarrative,
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

    const fetchNarrative =
      async () => {

        try {

          setLoading(
            true
          );

          const data =
            await getAINarrative(
              challengeId
            );

          setNarrative(
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

    if (
      challengeId
    ) {
      fetchNarrative();
    }

  }, [challengeId]);

  return {
    narrative,
    loading,
    error,
  };
};

export default useAINarrative;