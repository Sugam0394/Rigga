import mongoose from "mongoose";

import {
  REMINDER_TYPES,
  REMINDER_STATUS,
} from "../constants/reminderConstants.js";

const reminderSchema = new mongoose.Schema(
  {
    challengeId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Challenge",
      required: true,
      index: true,
    },

    checkpointId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Checkpoint",
      required: true,
      index: true,
    },

    type: {
      type: String,
      enum: Object.values(REMINDER_TYPES),
      required: true,
    },

    scheduledAt: {
      type: Date,
      required: true,
    },

    status: {
      type: String,
      enum: Object.values(REMINDER_STATUS),
      default: REMINDER_STATUS.PENDING,
    },

    triggeredAt: {
      type: Date,
      default: null,
    },
  },
  {
    timestamps: true,
  }
);
reminderSchema.index({
  status: 1,
  scheduledAt: 1,
});

export const Reminder = mongoose.model("Reminder", reminderSchema);