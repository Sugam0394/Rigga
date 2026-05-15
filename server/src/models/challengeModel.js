import mongoose from "mongoose";

const challengeSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },

    description: {
      type: String,
      required: true,
    },

    consequence: {
      type: String,
      required: true,
    },

    stakeType: {
      type: String,
      enum: ["photo", "money", "social" , 'text'],
      required: true,
    },

    isPaid: {
      type: Boolean,
      default: false,
    },

    price: {
      type: Number,
      default: 0,
    },

    category: {
      type: String,
      enum: ["fitness", "study", "discipline", "social"],
      required: true,
    },

    difficulty: {
      type: String,
      enum: ["easy", "medium", "hard"],
      default: "easy",
    },

    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

export const Challenge = mongoose.model(
  "Challenge",
  challengeSchema
);