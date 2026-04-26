 import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    phone: {
      type: String,
    },

    name: {
      type: String,
      default: "",
    },

    currentStreak: {
      type: Number,
      default: 0,
    },

    longestStreak: {
      type: Number,
      default: 0,
    },

    whatsappNumber: {
      type: String,
      required: true,
      unique: true,
    },

    state: {
      type: String,
      enum: ["new", "asked_name", "asked_goal", "asked_witness", "active"],
      default: "new",
    },

    missCount: {
      type: Number,
      default: 0,
    },

    lastCheckinDate: {
      type: Date,
      default: null,
    },

    subscriptionStatus: {
      type: String,
      enum: ["free", "paid"],
      default: "free",
    },
  },
  { timestamps: true }
);

export const User = mongoose.model("User", userSchema);