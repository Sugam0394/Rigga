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
  required: true,
  unique: true,
  trim: true,
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