import {
  useEffect,
  useState,
} from "react";

import {
  getSettings,
} from "../api/settingsApi";

const useSettings = () => {
  const [settings, setSettings] =
    useState(null);

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState("");

  useEffect(() => {
    const fetchSettings =
      async () => {
        try {
          const response =
            await getSettings();

          setSettings(
            response.data
          );
        } catch (error) {
          setError(
            error?.response?.data
              ?.message ||
              "Unable to load settings."
          );
        } finally {
          setLoading(false);
        }
      };

    fetchSettings();
  }, []);

  return {
    settings,
    loading,
    error,
  };
};

export default useSettings;