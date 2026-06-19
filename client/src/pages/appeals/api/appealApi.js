import api from "../../../api/apiClient";

export const submitAppeal = async ({
  challengeId,
  notes,
  imageUrl,
}) => {
  const response =
    await api.post(
      `/challenge/${challengeId}/appeal`,
      {
        notes,
        imageUrl,
      }
    );

  return response.data;
};