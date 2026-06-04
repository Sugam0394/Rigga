import consequenceRepository from "../repositories/consequenceRepository.js";

const createConsequence = async ({
  challengeId,
  privateMessage,
}) => {
  return await consequenceRepository.createConsequence({
    challengeId,
    privateMessage,
    isLocked: true,
    isReleased: false,
  });
};

export default {
  createConsequence,
};