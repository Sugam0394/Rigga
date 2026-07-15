 import { useCallback, useEffect, useState } from "react";

import { getInvitation } from "../api/witnessInvitationApi";

const useWitnessInvitation = (token) => {
  const [data, setData] = useState(null);

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState("");

  const fetchInvitation = useCallback(async () => {
    if (!token) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setData(null);
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      setError("");

      const invitation = await getInvitation(token);

      setData(invitation);

    } catch (err) {
      setError(
        err.response?.data?.message ||
        "Unable to load witness invitation."
      );
    } finally {
      setLoading(false);
    }
  }, [token]);

  useEffect(() => {
    fetchInvitation();
  }, [fetchInvitation]);

  return {
    data,
    loading,
    error,
    refetch: fetchInvitation,
  };
};

export default useWitnessInvitation;