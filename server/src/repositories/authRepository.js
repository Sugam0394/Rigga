import User
  from "../models/userModel.js";

const findUserByPhone = async (phone) => {
    return User.findOne({
      phone,
    });
  };

  const saveOtp = async (
  userId,
  otpCode,
  otpExpiresAt
) => {
  return User.findByIdAndUpdate(
    userId,
    {
      otpCode,
      otpExpiresAt,
    },
    {
      new: true,
    }
  );
};

const clearOtp = async (
  userId
) => {
  return User.findByIdAndUpdate(
    userId,
    {
      otpCode: null,
      otpExpiresAt: null,
    },
    {
      new: true,
    }
  );
};

const updateLastLogin = async (userId) => {
    return User.findByIdAndUpdate(
      userId,
      {
        lastLoginAt:
          new Date(),
      },
      {
        new: true,
      }
    );
  };

  const findUserById = async (
  userId
) => {
  return User.findById(userId);
};

export default {
  findUserByPhone,
  saveOtp,
  clearOtp,
  updateLastLogin,
  findUserById,
};