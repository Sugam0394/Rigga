 import Appeal
  from "../models/appealModel.js";

const createAppeal = async (
  appealData
) => {
  return Appeal.create(
    appealData
  );
};

const getByChallengeId = async (
  challengeId
) => {
  return Appeal.findOne({
    challengeId,
  });
};

export default {
  createAppeal,
  getByChallengeId,
};