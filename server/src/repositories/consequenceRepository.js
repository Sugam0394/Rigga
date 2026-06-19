import Consequence from "../models/consequenceModel.js";

const createConsequence = async (
  consequenceData
) => {
  return await Consequence.create(
    consequenceData
  );
};

const findByChallengeId = async (
  challengeId
) => {
  return await Consequence.findOne({
    challengeId,
  });
};

const getByChallengeId = async (
  challengeId
) => {
  return Consequence.findOne({
    challengeId,
  });
};

const releaseConsequence = async (
  challengeId
) => {
  return Consequence.findOneAndUpdate(
    {
      challengeId,
    },
    {
      isReleased: true,
      releasedAt: new Date(),
    },
    {
      new: true,
    }
  );
};

export default {
  createConsequence,
  findByChallengeId,
  getByChallengeId,
  releaseConsequence,
};