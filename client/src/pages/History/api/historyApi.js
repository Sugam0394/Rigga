import apiClient
  from "../../../api/apiClient";

const getChallengeHistory = async () => {

  const response =
    await apiClient.get(
      "/history/challenges"
    );

  return response.data;

};

export default {
  getChallengeHistory,
};