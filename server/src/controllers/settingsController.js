import settingsService from "../services/settingsService.js";

const getSettings = async (
  req,
  res
) => {
  try {
    const settings =
      await settingsService.getSettings(
        req.user.userId
      );

    return res.status(200).json({
      success: true,
      data: settings,
    });
  } catch (error) {
    return res.status(404).json({
      success: false,
      message: error.message,
    });
  }
};

const updateSettings = async (
  req,
  res
) => {
  try {
    const settings =
      await settingsService.updateSettings(
        req.user.userId,
        req.body
      );

    return res.status(200).json({
      success: true,
      data: settings,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

export default {
  getSettings,
  updateSettings,
};