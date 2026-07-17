import User from "../models/userModel.js";

const getProfileById = async (userId) => {
  return User.findById(userId);
};

const getProfileByUsername = async (username) => {
  return User.findOne({ username });
};

const updateProfile = async (userId, updateData) => {
  return User.findByIdAndUpdate(
    userId,
    updateData,
    {
      new: true,
      runValidators: true,
    }
  );
};

export default {
  getProfileById,
  getProfileByUsername,
  updateProfile,
};