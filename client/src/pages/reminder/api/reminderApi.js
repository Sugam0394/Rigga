import api from "../../../api/apiClient";

export const getChallengeReminders = async (
  challengeId
) => {
  const response = await api.get(
    `/challenges/${challengeId}/reminders`
  );

  return response.data.data;
};

export const getReminderStatus = async (
  challengeId
) => {
  const response = await api.get(
    `/challenges/${challengeId}/reminder-status`
  );

  return response.data.data;
};

export const getReminderDecision = async (
  challengeId
) => {
  const response = await api.get(
    `/challenges/${challengeId}/reminder-decision`
  );

  return response.data.data;
};

export const getReminderHistory = async (
  challengeId
) => {
  const response = await api.get(
    `/challenges/${challengeId}/reminder-history`
  );

  return response.data.data;
};