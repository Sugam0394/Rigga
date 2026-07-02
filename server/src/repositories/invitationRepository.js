 import Invitation from "../models/invitationModel.js";

 const createInvitation = async (
  invitationData,
  session = null
) => {
  const [invitation] = await Invitation.create(
    [invitationData],
    { session }
  );

  return invitation;
};

const getInvitationByToken = async (token) => {
  return Invitation.findOne({ token });
};

const getInvitationByChallengeId = async (challengeId) => {
  return Invitation.findOne({ challengeId });
};

const getActiveInvitationByChallengeId = async (challengeId) => {
  return Invitation.findOne({
    challengeId,
    status: "ACTIVE",
  });
};

 const invalidateInvitation = async (
  invitationId,
  session = null
) => {
  return Invitation.findByIdAndUpdate(
    invitationId,
    {
      $set: {
        status: "SUPERSEDED",
      },
    },
    {
      new: true,
      session,
    }
  );
};

const getActiveInvitationByToken = async (token) => {
  return Invitation.findOne({
    token,
    status: "ACTIVE",
  });
};

 const acceptInvitation = async (
  invitationId,
  session = null
) => {
  return Invitation.findByIdAndUpdate(
    invitationId,
    {
      $set: {
        status: "ACCEPTED",
      },
    },
    {
      new: true,
      session,
    }
  );
};

const claimActiveInvitation = async (
  token,
  session = null
) => {
  return Invitation.findOneAndUpdate(
    {
      token,
      status: "ACTIVE",
    },
    {
      $set: {
        status: "ACCEPTED",
      },
    },
    {
      new: true,
      session,
    }
  );
};

const declineInvitation = async (
  invitationId,
  session = null
) => {
  return Invitation.findByIdAndUpdate(
    invitationId,
    {
      $set: {
        status: "DECLINED",
      },
    },
    {
      new: true,
      session,
    }
  );
};

export default {
  createInvitation,
  getInvitationByToken,
  getInvitationByChallengeId,
  getActiveInvitationByChallengeId,
  invalidateInvitation,
  getActiveInvitationByToken,
acceptInvitation,
claimActiveInvitation,
declineInvitation,
};