import apiClient from "../../../api/apiClient.js";

export const getWitnessInvitationApi = async (
  token
) => {
  const response =
    await apiClient.get(
      `/witness/${token}`
    );

  return response.data;
};