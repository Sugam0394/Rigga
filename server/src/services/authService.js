import authRepository from "../repositories/authRepository.js";
import jwt from "jsonwebtoken";
import { OTP_EXPIRY_MINUTES, } from "../constants/authConstants.js";
import phoneVerificationRepository from "../repositories/phoneVerificationRepository.js"
import userService from "./userService.js";
import smsService from "./smsService.js";



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
) => {  const otpCode =
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

 const existingVerification =
  await phoneVerificationRepository
    .findByPhone(phone);

if (existingVerification) {
  await phoneVerificationRepository
    .updateVerification(
      phone,
      {
  otpCode,
  otpExpiresAt,
  verified: false,
  attempts: 0,
  lastOtpSentAt: new Date(),
}
    );
} else {
  await phoneVerificationRepository
    .createVerification({
  phone,
  otpCode,
  otpExpiresAt,
  verified: false,
  attempts: 0,
  lastOtpSentAt: new Date(),
} );
}
 if (process.env.NODE_ENV === "development") {
  return {
    message: "OTP generated successfully",
    developmentOtp: otpCode,
  };
}
try {
  await smsService.sendOtp(
    phone,
    otpCode
  );
} catch (error) {
  await phoneVerificationRepository.updateVerification(
    phone,
    {
      otpCode: null,
      otpExpiresAt: null,
      verified: false,
      attempts: 0,
    }
  );

  throw new Error(
    "Unable to send OTP. Please try again."
  );
}

return {
  message: "OTP generated successfully",
};
};

  const verifyOtp = async (
  phone,
  otp
) => {
  const verification =
    await phoneVerificationRepository.findByPhone(
      phone
    );

  if (!verification) {
    throw new Error(
      "Verification not found"
    );
  }

  if (verification.verified) {
    throw new Error(
      "OTP already used"
    );
  }

  if (verification.attempts >= 5) {
    throw new Error(
      "Maximum verification attempts exceeded"
    );
  }

  if (
    !verification.otpExpiresAt ||
    verification.otpExpiresAt < new Date()
  ) {
    await phoneVerificationRepository.updateVerification(
      phone,
      {
        verified: true,
        otpCode: null,
        otpExpiresAt: null,
        attempts: 0,
      }
    );

    throw new Error(
      "OTP expired"
    );
  }

  if (verification.otpCode !== otp) {
    await phoneVerificationRepository.incrementAttempts(
      phone
    );

    throw new Error(
      "Invalid OTP"
    );
  }

  await phoneVerificationRepository.updateVerification(
    phone,
    {
      verified: true,
      otpCode: null,
      otpExpiresAt: null,
      attempts: 0,
    }
  );

  const user =
    await authRepository.findUserByPhone(
      phone
    );

  if (!user) {
    return {
      isNewUser: true,
      verifiedPhone: phone,
    };
  }

  await authRepository.updateLastLogin(
    user._id
  );

  const token =
    generateToken(user);

  return {
    isNewUser: false,
    token,
    user,
  };
};


 const completeProfile = async (
  profileData
) => {
  const user =
    await userService
      .createUser(
        profileData
      );

  const token =
    generateToken(
      user
    );

  return {
    user,
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
  completeProfile,
  generateToken,
};