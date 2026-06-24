import mongoose from "mongoose";

const phoneVerificationSchema = new mongoose.Schema(
    {
      phone: {
        type: String,
        required: true,
        trim: true,
        unique: true,
      },

      otpCode: {
        type: String,
        required: true,
      },

      otpExpiresAt: {
        type: Date,
        required: true,
      },

      verified: {
        type: Boolean,
        default: false,
      },
    },
    {
      timestamps: true,
    }
  );

export default mongoose.model(
  "PhoneVerification",
  phoneVerificationSchema
);