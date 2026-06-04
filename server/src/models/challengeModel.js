import mongoose from "mongoose";
import { CHALLENGE_STATUS } from "../constants/challengeStatus.js";

const challengeSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },

    deadline: {
      type: Date,
      required: true,
    },

    

  witness: {
  name: {
    type: String,
    required: true,
    trim: true,
  },

  phone: {
    type: String,
    required: true,
    trim: true,
  },

  notifiedAt: {
    type: Date,
    default: null,
  },

  decision: {
    type: String,
    default: null,
  },

  rejectionReason: {
    type: String,
    default: null,
  },

  decidedAt: {
    type: Date,
    default: null,
  },
},

    successCriteria: {
      type: String,
      required: true,
    },

    status: {
      type: String,
      enum: Object.values(CHALLENGE_STATUS),
      default: CHALLENGE_STATUS.ACTIVE,
    },
  },
  {
    timestamps: true,
  }
);

const Challenge = mongoose.model(
  "Challenge",
  challengeSchema
);

export default Challenge;