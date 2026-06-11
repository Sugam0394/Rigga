 import api from "../../../api/apiClient";

export const submitProgressReport =  async ({
    challengeId,
    notes,
    image,
  }) => {
    const formData =
      new FormData();

    formData.append(
      "challengeId",
      challengeId
    );

    formData.append(
      "notes",
      notes
    );

    formData.append(
      "image",
      image
    );

    const response = await api.post(
        "/progress-reports",
        formData,
     
      );

    return response.data.data;
  };

  export const getProgressReports = async (challengeId) => {
    const response =
      await api.get(
        `/challenges/${challengeId}/progress-reports`
      );

    return response.data.data;
  };