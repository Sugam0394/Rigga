import Challenge from "../models/challengeModel.js";

const createChallenge = async (challengeData) => {
  return await Challenge.create(challengeData);
};

const updateWitnessNotifiedAt = async (
  challengeId
) => {
  return await Challenge.findByIdAndUpdate(
    challengeId,
    {
      "witness.notifiedAt": new Date(),
    },
    {
       returnDocument: "after",
    }
  );
};

const approveChallenge = async (
  challengeId
) => {
  return Challenge.findByIdAndUpdate(
    challengeId,
    {
      $set: {
        "witness.decision":
          "APPROVED",
        "witness.decidedAt":
          new Date(),
      },
    },
    {
     returnDocument: "after",
    }
  );
};

const rejectChallenge = async ({
  challengeId,
  rejectionReason,
}) => {
  return Challenge.findByIdAndUpdate(
    challengeId,
    {
      $set: {
        "witness.decision":
          "REJECTED",
        "witness.rejectionReason":
          rejectionReason,
        "witness.decidedAt":
          new Date(),
      },
    },
    {
      returnDocument: "after",
    }
  );
};
 

 const getChallengeById = async (
  challengeId
) => {
  return Challenge.findById(
    challengeId
  );
};

 const updateStatus = async (
  challengeId,
  status
) => {
  return Challenge.findByIdAndUpdate(
    challengeId,
    {
      $set: {
        status,
      },
    },
    {
      returnDocument: "after",
    }
  );
};
 

export default {
  createChallenge,
  updateWitnessNotifiedAt,
  approveChallenge,
  rejectChallenge,
  getChallengeById,
  updateStatus,
 
};