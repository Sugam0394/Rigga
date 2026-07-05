import mongoose from "mongoose";
import { CHALLENGE_STATUS } from "../constants/challengeStatus.js";
import { CHALLENGE_CATEGORIES } from "../constants/challengeCategories.js";



const challengeSchema = new mongoose.Schema(
  {
    userId: {
  type: mongoose.Schema.Types.ObjectId,
  ref: "User",
  required: true,
},
    title: {
      type: String,
      required: true,
      trim: true,
    },

    category: {
  type: String,

  enum: Object.values(
    CHALLENGE_CATEGORIES
  ),

  default:
    CHALLENGE_CATEGORIES.CUSTOM,
},

    deadlineAt: {
      type: Date,
      required: true,
    },

    

  witness: {
  name: {
    type: String,
    trim: true,
  },

  phone: {
    type: String,
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
  
  reviewToken: {
  type: String,
  default: null,
  index: true,
},

reviewTokenExpiresAt: {
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
  default: CHALLENGE_STATUS.PENDING_WITNESS,
},
observationStrategy: {
  version: {
    type: Number,
    required: true,
    immutable: true,
  },

  observationMode: {
    type: String,
    required: true,
    immutable: true,
  },

  cadence: {
    type: String,
    required: true,
    immutable: true,
  },

  generatedFrom: {
    title: {
      type: String,
      required: true,
      immutable: true,
    },

    successCriteria: {
      type: String,
      required: true,
      immutable: true,
    },

    durationDays: {
      type: Number,
      required: true,
      immutable: true,
    },
  },
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