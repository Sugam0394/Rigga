import api
  from "../../../api/apiClient";

export const getAICoach =
  async (
    challengeId
  ) => {

    const response =
      await api.get(
        `/challenges/${challengeId}/ai-coach`
      );

    return response
      .data
      .data;
};