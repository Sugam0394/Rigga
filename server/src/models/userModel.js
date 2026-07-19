import mongoose from "mongoose";

import {
  USER_ROLES,
} from "../constants/userConstants.js";

import { USER_SUBSCRIPTION_PLANS } from "../constants/subscriptionConstants.js";

const userSchema = new mongoose.Schema(
    {
      name: {
        type: String,
        required: true,
        trim: true,
      },

      username: {
  type: String,
  unique: true,
  sparse: true,
  trim: true,
  default: null,
},

bio: {
  type: String,
  default: "",
  trim: true,
},

avatarUrl: {
  type: String,
  default: null,
  trim: true,
},

avatarUpdatedAt: {
  type: Date,
  default: null,
},

timezone: {
  type: String,
  default: "UTC",
  trim: true,
},

language: {
  type: String,
  default: "en",
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

 subscription: {
  plan: {
    type: String,
    enum: Object.values(USER_SUBSCRIPTION_PLANS),
    default: USER_SUBSCRIPTION_PLANS.FREE,
  },
},

 settings: {
  theme: {
    type: String,
    enum: ["light", "dark", "system"],
    default: "system",
  },

  notificationPreferences: {
    inApp: {
      type: Boolean,
      default: true,
    },
    push: {
      type: Boolean,
      default: false,
    },
    sms: {
      type: Boolean,
      default: false,
    },
    email: {
      type: Boolean,
      default: true,
    },
    whatsapp: {
      type: Boolean,
      default: false,
    },
  },

  privacyPreferences: {
    profileVisibility: {
      type: String,
      enum: ["public", "private"],
      default: "public",
    },

    activityVisibility: {
      type: String,
      enum: ["public", "private"],
      default: "public",
    },
  },

  appPreferences: {
    timeFormat: {
      type: String,
      enum: ["12h", "24h"],
      default: "24h",
    },

    dateFormat: {
      type: String,
      default: "DD/MM/YYYY",
    },
  },
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