import apiClient from "../../../api/apiClient";

export const getChallenges = async () => {
  const response = await apiClient.get(
    "/challenges"
  );

  return response.data.data;
};