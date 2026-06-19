import apiClient from "../../../api/apiClient.js";

export const createChallengeApi = async (
  challengeData
) => {
  const response =
    await apiClient.post(
      "/challenge", // change ONLY if backend route is different
      challengeData
    );

  return response.data;
};