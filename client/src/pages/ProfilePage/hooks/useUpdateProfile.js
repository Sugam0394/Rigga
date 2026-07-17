import { useState } from "react";

import {
  updateProfile,
} from "../api/ProfileApi";

const useUpdateProfile = () => {
  const [loading, setLoading] =
    useState(false);

  const [error, setError] =
    useState("");

  const [success, setSuccess] =
    useState(false);

  const update = async (
    profileData
  ) => {
    try {
      setLoading(true);
      setError("");
      setSuccess(false);

      const response =
        await updateProfile(
          profileData
        );

      setSuccess(true);

      return response;
    } catch (error) {
      setError(
        error?.response?.data
          ?.message ||
          "Unable to update profile."
      );

      throw error;
    } finally {
      setLoading(false);
    }
  };

  return {
    update,
    loading,
    error,
    success,
  };
};

export default useUpdateProfile;