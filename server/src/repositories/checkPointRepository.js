import Checkpoint
  from "../models/checkPointModel.js";

const createMany = async (
  checkpoints
) => {
  return Checkpoint.insertMany(
    checkpoints
  );
};

const getByChallengeId = async (
  challengeId
) => {
  return Checkpoint.find({
    challengeId,
  });
};

export default {
  createMany,
  getByChallengeId,
};