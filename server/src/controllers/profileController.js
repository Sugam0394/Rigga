import profileService from "../services/profileServices.js";

const getProfile = async (
  req,
  res
) => {
  try {
    const profile =
      await profileService.getProfile(
        req.user.userId
      );

    res.status(200).json({
      success: true,
      data: profile,
    });
  } catch (error) {
    res.status(404).json({
      success: false,
      message: error.message,
    });
  }
};

const updateProfile = async (
  req,
  res
) => {
  try {
    const profile =
      await profileService.updateProfile(
        req.user.userId,
        req.body
      );

    res.status(200).json({
      success: true,
      data: profile,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

export default {
  getProfile,
  updateProfile,
};