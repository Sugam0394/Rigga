import witnessService from "../services/witnessService.js";

const getInvitationStatus = async (
  req,
  res,
  next
) => {
  try {
    const result =
      await witnessService.getInvitationStatus({
        challengeId:
          req.params.challengeId,
        userId: req.user.id,
      });

    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

const getWitnessStatus = async (
  req,
  res,
  next
) => {
  try {
    const result =
      await witnessService.getWitnessStatus({
        challengeId:
          req.params.challengeId,
        userId: req.user.id,
      });

    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

const getReviewStatus = async (
  req,
  res,
  next
) => {
  try {
    const result =
      await witnessService.getReviewStatus({
        challengeId:
          req.params.challengeId,
        userId: req.user.id,
      });

    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

const getAppealStatus = async (
  req,
  res,
  next
) => {
  try {
    const result =
      await witnessService.getAppealStatus({
        challengeId:
          req.params.challengeId,
        userId: req.user.id,
      });

    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

const getWitnessTimeline = async (
  req,
  res,
  next
) => {
  try {
    const result =
      await witnessService.getWitnessTimeline({
        challengeId:
          req.params.challengeId,
        userId: req.user.id,
      });

    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

export default {
  getInvitationStatus,
  getWitnessStatus,
  getReviewStatus,
  getAppealStatus,
  getWitnessTimeline,
};