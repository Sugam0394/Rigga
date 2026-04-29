 import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    // 📞 Core identity
    whatsappNumber: {
      type: String,
      required: true,
      unique: true,
    },

    phone: {
      type: String,
      default: "",
    },

    name: {
      type: String,
      default: "",
    },

    // 🔥 STREAK SYSTEM (NEW)
    currentStreak: {
      type: Number,
      default: 0,
    },

    longestStreak: {
      type: Number,
      default: 0,
    },

    lastActiveDate: {
      type: Date,
      default: null,
    },

    // 🔁 STATE MACHINE
    state: {
      type: String,
      enum: ["new", "asked_name", "asked_goal", "asked_witness", "active"],
      default: "new",
    },

    // 📊 Tracking
    missCount: {
      type: Number,
      default: 0,
    },

    lastCheckinDate: {
      type: Date,
      default: null,
    },

    lastCronRun: {
      type: Date,
      default: null,
    },

    // 💰 Subscription
    subscriptionStatus: {
      type: String,
      enum: ["free", "paid"],
      default: "free",
    },
    goal: {
  type: String,
  default: "",
},

witness: {
  type: String,
  default: "",
},
  },
  { timestamps: true }
);

export const User = mongoose.model("User", userSchema);