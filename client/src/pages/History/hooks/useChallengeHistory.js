import {
  useCallback,
  useEffect,
  useState,
} from "react";

import historyApi
  from "../api/historyApi.js";

const useChallengeHistory = () => {

  const [
    history,
    setHistory,
  ] = useState([]);

  const [
    loading,
    setLoading,
  ] = useState(true);

  const [
    error,
    setError,
  ] = useState(null);

  const refresh =
    useCallback(async () => {

      try {

        setLoading(true);

        setError(null);

        const response =
          await historyApi
            .getChallengeHistory();

        setHistory(
          response.data.history
        );

      } catch (err) {

        setError(err);

      } finally {

        setLoading(false);

      }

    }, []);

  useEffect(() => {

    refresh();

  }, [refresh]);

  return {

    history,

    loading,

    error,

    refresh,

  };

};

export default
  useChallengeHistory;