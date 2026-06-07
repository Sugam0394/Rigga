import authRepository from "../repositories/authRepository.js";
import jwt from "jsonwebtoken";
import { OTP_EXPIRY_MINUTES, } from "../constants/authConstants.js";

const generateToken =  (user) => {
    return jwt.sign(
      {
        userId:
          user._id,

        phone:
          user.phone,

        role:
          user.role,
      },

      process.env.JWT_SECRET,

      {
        expiresIn: "7d",
      }
    );
  };

const requestOtp = async (
  phone
) => {
  const user =
    await authRepository
      .findUserByPhone(
        phone
      );

  if (!user) {
    throw new Error(
      "User not found"
    );
  }

   const otpCode =
  Math.floor(
    100000 +
    Math.random() * 900000
  ).toString();

const otpExpiresAt =
  new Date(
    Date.now() +
    OTP_EXPIRY_MINUTES *
      60 *
      1000
  );

await authRepository
  .saveOtp(
    user._id,
    otpCode,
    otpExpiresAt
  );

console.log(
  "OTP:",
  otpCode
);

return {
  message:
    "OTP generated successfully",
};
};

const verifyOtp = async (
  phone,
  otp
) => {
  const user =
    await authRepository
      .findUserByPhone(
        phone
      );

  if (!user) {
    throw new Error(
      "User not found"
    );
  }

  if (
    user.otpCode !== otp
  ) {
    throw new Error(
      "Invalid OTP"
    );
  }

  if (
    !user.otpExpiresAt ||
    user.otpExpiresAt <
      new Date()
  ) {
    throw new Error(
      "OTP expired"
    );
  }

  await authRepository
    .clearOtp(
      user._id
    );

  await authRepository
    .updateLastLogin(
      user._id
    );

  const token =
    generateToken(
      user
    );

  return {
    token,
  };
};


const getCurrentUser = async (userId) => {
    const user =
      await authRepository
        .findUserById(
          userId
        );

    if (!user) {
      throw new Error(
        "User not found"
      );
    }

    return {
      id: user._id,
      name: user.name,
      phone: user.phone,
      role: user.role,
    };
  };

export default {
  requestOtp,
  verifyOtp,
  getCurrentUser,
};