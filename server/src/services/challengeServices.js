 import challengeRepository from "../repositories/challengeRepositories.js";
import witnessService from "./witnessServices.js";
import consequenceService from "./consequenceService.js";
import checkpointService from "./checkPointService.js";

const createChallenge = async (challengeData) => {
  const {
    title,
    deadline,
    privateMessage,
    witness,
    successCriteria,
  } = challengeData;

  if (
    !title ||
    !deadline ||
    !privateMessage ||
    !witness ||
    !witness.name ||
    !witness.phone ||
    !successCriteria
  ) {
    throw new Error("All fields are required");
  }

  const challengePayload = {
    title,
    deadline,
    witness,
    successCriteria,
  };

  const challenge =
    await challengeRepository.createChallenge(
      challengePayload
    );

  await consequenceService.createConsequence({
    challengeId: challenge._id,
    privateMessage,
  });

    await checkpointService.createCheckpoints({
    challengeId: challenge._id,
    startDate: challenge.createdAt,
    endDate: challenge.deadline,
  });

  await witnessService.notifyWitness(
    challenge
  );
 

  return challenge;
};

export default {
  createChallenge,
};