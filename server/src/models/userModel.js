import mongoose from "mongoose";

import {
  USER_ROLES,
} from "../constants/userConstants.js";

const userSchema = new mongoose.Schema(
    {
      name: {
        type: String,
        required: true,
        trim: true,
      },

      email: {
        type: String,
        required: true,
        trim: true,
        unique: true
      },

    phone: {
  type: String,
  required: false,
  unique: true,
  sparse: true,
  trim: true,
},

googleId: {
  type: String,
  default: null,
  unique: true,
  sparse: true,
  trim: true,
},
authProvider: {
  type: String,
  enum: ["phone", "google"],
  required: true,
  default: "phone",
},

      role: {
        type: String,
        enum: Object.values(
          USER_ROLES
        ),
        default:
          USER_ROLES.USER,
      },
      otpCode: {
  type: String,
  default: null,
},

otpExpiresAt: {
  type: Date,
  default: null,
},

lastLoginAt: {
  type: Date,
  default: null,
},
    },
    {
      timestamps: true,
    }
  );

export default mongoose.model(
  "User",
  userSchema
);