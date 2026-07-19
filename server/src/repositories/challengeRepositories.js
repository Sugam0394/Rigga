import Challenge from "../models/challengeModel.js";
import { CHALLENGE_STATUS, } from "../constants/challengeStatus.js";
import { ACTIVE_SLOT_STATUSES } from "../constants/challengeCapacityConstants.js";


const createChallenge = async (challengeData) => {
  return await Challenge.create(challengeData);
};

 const updateWitnessNotifiedAt = async (
  challengeId
) => {
  return await Challenge.findByIdAndUpdate(
    challengeId,
    {
      $set: {
        "witness.notifiedAt":
          new Date(),
      },
    },
    {
      new: true,
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
     new: true
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
  currentStatus,
  nextStatus
) => {
  return Challenge.findOneAndUpdate(
    {
      _id: challengeId,
      status: currentStatus,
    },
    {
      $set: {
        status: nextStatus,
      },
    },
    {
      new: true,
    }
  );
};
 
const getByReviewToken = async (token) => {
  return Challenge.findOne({
    "witness.reviewToken": token,
  });
};

const getActiveChallengeCountByUserId = async (userId) => {
  return Challenge.countDocuments({
    userId,
    status: {
      $in: ACTIVE_SLOT_STATUSES,
    },
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



 const attachWitness = async ({
  challengeId,
  witness,
  session = null,
}) => {
  return Challenge.findByIdAndUpdate(
    challengeId,
    {
      $set: {
        witness,
      },
    },
    {
      new: true,
      session,
    }
  );
};

 const activateChallenge = async (
  challengeId,
  session = null
) => {
  return Challenge.findByIdAndUpdate(
    challengeId,
    {
      $set: {
        status: CHALLENGE_STATUS.ACTIVE,
      },
    },
    {
      new: true,
      session,
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
  getByReviewToken,
  getChallengesByUserId,
  getActiveChallenges,
  getExpiredActiveChallenges,
  attachWitness,
activateChallenge,

getActiveChallengeCountByUserId
 
};