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
    attempts: {
    type: Number,
    default: 0,
},

lastOtpSentAt: {
    type: Date,
    default: Date.now,
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