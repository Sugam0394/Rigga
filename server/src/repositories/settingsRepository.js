import User from "../models/userModel.js";

const getSettingsByUserId = async (
  userId
) => {
  return await User.findById(
    userId
  ).select("settings");
};

const updateSettings = async (
  userId,
  settingsData
) => {
  return await User.findByIdAndUpdate(
    userId,
    {
      $set: {
        settings: settingsData,
      },
    },
    {
      new: true,
      runValidators: true,
    }
  ).select("settings");
};

export default {
  getSettingsByUserId,
  updateSettings,
};