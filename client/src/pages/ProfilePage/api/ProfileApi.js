 import apiClient from "../../../api/apiClient";

export const getProfile = async () => {
  const response = await apiClient.get("/profile");
  return response.data;
};

export const updateProfile = async (profileData) => {
  const response = await apiClient.patch(
    "/profile",
    profileData
  );

  return response.data;
};