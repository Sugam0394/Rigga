import {
  useEffect,
  useState,
} from "react";

import {
  getProfile,
} from "../api/ProfileApi";

const useProfile = () => {
  const [profile, setProfile] =
    useState(null);

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState("");

  useEffect(() => {
    const fetchProfile =
      async () => {
        try {
          const response =
            await getProfile();

          setProfile(
            response.data
          );
        } catch (error) {
          setError(
            error?.response?.data
              ?.message ||
              "Unable to load profile"
          );
        } finally {
          setLoading(false);
        }
      };

    fetchProfile();
  }, []);

  return {
    profile,
    loading,
    error,
  };
};

export default useProfile;