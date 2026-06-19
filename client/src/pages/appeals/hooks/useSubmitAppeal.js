import { useState } from "react";

import {
  submitAppeal as submitAppealApi,
} from "../api/appealApi";

const useSubmitAppeal = () => {
  const [loading, setLoading] =
    useState(false);

  const [error, setError] =
    useState("");

  const [success, setSuccess] =
    useState(false);

  const submitAppeal = async (
    appealData
  ) => {
    try {
      setLoading(true);
      setError("");
      setSuccess(false);

      await submitAppealApi(
        appealData
      );

      setSuccess(true);

    } catch (err) {

      setError(
        err?.response?.data?.message ||
        err.message ||
        "Failed to submit appeal"
      );

    } finally {

      setLoading(false);

    }
  };

  return {
    loading,
    error,
    success,
    submitAppeal,
  };
};

export default useSubmitAppeal;