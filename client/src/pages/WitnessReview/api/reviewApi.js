import api from "../../../api/apiClient"







export const getReviewSummary = async (challengeId  ) => {

    const response =
      await api.get(
        `/challenges/${challengeId}/review-summary`
      );

    return response.data.data;
};

export const submitReview = async ({
    challengeId,
    decision,
    rejectionReason,
  }) => {

    const response =
      await api.patch(
        `/challenge/${challengeId}/witness-review`,
        {
          decision,
          rejectionReason,
        }
      );

    return response.data.data;
};

 

export const trackWitnessShare = async (
    challengeId
  ) => {

    await api.post(
      `/analytics/${challengeId}/share`
    );
  };

  export const getWitnessAnalytics =
  async (challengeId) => {

    const response =
      await api.get(
        `/analytics/${challengeId}`
      );

    return response.data.data;
  };