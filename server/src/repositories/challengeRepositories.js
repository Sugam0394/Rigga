import Challenge from "../models/challengeModel.js";
import { CHALLENGE_STATUS, } from "../constants/challengeStatus.js";
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


const getChallengesByUserId = async (userId) => {
  return Challenge.find({ userId }).sort({
    createdAt: -1,
  });
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
 
const getByReviewToken = async (token) => {
  return Challenge.findOne({
    "witness.reviewToken": token,
  });
};

const getActiveChallenges = async () => {
    return Challenge.find({
      status:
        CHALLENGE_STATUS.ACTIVE,
    });
  };

  const getExpiredActiveChallenges = async (currentTime) => {
    return Challenge.find({
      status:
        CHALLENGE_STATUS.ACTIVE,
      deadlineAt: {
        $lt: currentTime,
      },
    });
  };

export default {
  createChallenge,
  updateWitnessNotifiedAt,
  approveChallenge,
  rejectChallenge,
  getChallengeById,
  updateStatus,
  getByReviewToken,
  getChallengesByUserId,
  getActiveChallenges,
  getExpiredActiveChallenges
 
};