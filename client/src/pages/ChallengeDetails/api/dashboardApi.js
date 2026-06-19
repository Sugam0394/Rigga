import api from "../../../api/apiClient.js";

export const getChallengeDashboard = async (
  challengeId
) => {
  const response = await api.get(
    `/challenges/${challengeId}/dashboard`
  );

  return response.data.data;
};