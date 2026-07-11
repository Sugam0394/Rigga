import {
  useEffect,
  useState,
} from "react";

import dashboardService
  from "../service/dashboardService.js";

const useDashboardRuntime = () => {

  const [
    dashboard,
    setDashboard,
  ] = useState(null);

  const [
    loading,
    setLoading,
  ] = useState(true);

  const [
    error,
    setError,
  ] = useState(null);

  const loadDashboard =
    async () => {

      try {

        setLoading(true);
        setError(null);

        const runtime =
          await dashboardService
            .loadDashboardRuntime();

        setDashboard(
          runtime
        );

      } catch (err) {

        setError(
          err?.response?.data?.message ||
          "Something went wrong"
        );

      } finally {

        setLoading(false);

      }

    };

   useEffect(() => {

    // eslint-disable-next-line react-hooks/set-state-in-effect
    loadDashboard();

  }, []);

  return {

    dashboard,

    loading,

    error,

    refresh:
      loadDashboard,

  };
};

export default
  useDashboardRuntime;