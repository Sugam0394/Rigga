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

 
 const loadProfile = async () => {
  try {
    setLoading(true);
    setError("");

    const response =
      await getProfile();

    setProfile(response.data);
  } catch (error) {
    setError(
      error?.response?.data
        ?.message ||
      "Unable to load profile."
    );
  } finally {
    setLoading(false);
  }
};

useEffect(() => {
  loadProfile();
}, []);

return {
  profile,
  loading,
  error,
  refreshProfile: loadProfile,
};
 
};

export default useProfile;