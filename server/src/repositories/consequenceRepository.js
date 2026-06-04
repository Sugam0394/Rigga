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

export default {
  createConsequence,
  findByChallengeId,
};