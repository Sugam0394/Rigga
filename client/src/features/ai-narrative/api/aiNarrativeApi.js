import api from "../../../api/apiClient";

export const getAINarrative =  async (
    challengeId
  ) => {

    const response =
      await api.get(
        `/challenges/${challengeId}/ai-narrative`
      );

    return response.data.data;
  };