 import challengeRepository
  from "../repositories/challengeRepositories.js";

const getChallengeHistory = async ({
  userId,
}) => {

  const history =
    await challengeRepository
      .getFinishedChallengesByUserId(
        userId
      );

  return history;

};

export default {
  getChallengeHistory,
};