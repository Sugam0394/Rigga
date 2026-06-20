 import api from "../../../api/apiClient";

export const getAIInsights =
  async (
    challengeId
  ) => {

    const response =
      await api.get(
        `/challenges/${challengeId}/ai-insights`
      );

    return response.data.data;
  };