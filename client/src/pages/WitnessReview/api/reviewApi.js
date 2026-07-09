 import api from "../../../api/apiClient";
 
// Public Invitation
 

export const getInvitation = async (token) => {
  const response =
    await api.get(
      `/witness/${token}`
    );

  return response.data.invitation;
};

 
// Accept Invitation
 

export const acceptInvitation = async ({
  token,
  name,
  phone,
}) => {
  const response =
    await api.post(
      `/witness/${token}/accept`,
      {
        name,
        phone,
      }
    );

  return response.data.data;
};

 
// Decline Invitation
 

export const declineInvitation = async (
  token
) => {
  const response =
    await api.post(
      `/witness/${token}/decline`
    );

  return response.data.data;
};


  
 
// Public Review Summary
 

export const getReviewSummary = async (
  token
) => {
  const response =
    await api.get(
      `/review/${token}`
    );

  return response.data.data;
};

 
// Submit Review
 
export const submitReview = async ({
  token,
  decision,
  rejectionReason,
}) => {
  const response =
    await api.patch(
      `/review/${token}/submit`,
      {
        decision,
        rejectionReason,
      }
    );

  return response.data.data;
};