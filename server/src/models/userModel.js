 import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    // 📞 Core identity
    whatsappNumber: {
      type: String,
      required: true,
      unique: true,
      index: true, // Added index for faster lookups
    },

    phone: {
      type: String,
      default: "",
    },

    name: {
      type: String,
      default: "",
    },

    // 🎮 TaskBox References (FIXED: Added missing fields)
    activeTaskBox: { type: mongoose.Schema.Types.ObjectId, ref: "TaskBox" },
    taskBoxes: [{ type: mongoose.Schema.Types.ObjectId, ref: "TaskBox" }],

    // 📊 Stats (FIXED: Added for Day 2/3 tracking)
    totalWins: { type: Number, default: 0 },
    totalFails: { type: Number, default: 0 },

    // 🔥 STREAK SYSTEM
    currentStreak: { type: Number, default: 0 },
    longestStreak: { type: Number, default: 0 },
    lastActiveDate: { type: Date, default: null },

    // 🔁 STATE MACHINE
    state: {
      type: String,
      enum: ["new", "asked_name", "asked_goal", "asked_witness", "active"],
      default: "new",
    },

    // 📊 Tracking
    missCount: { type: Number, default: 0 },
    lastCheckinDate: { type: Date, default: null },
    lastCronRun: { type: Date, default: null },

    // 💰 Subscription
    subscriptionStatus: {
      type: String,
      enum: ["free", "paid"],
      default: "free",
    },

    // ❌ REMOVED: goal and witness (They belong in TaskBox only)
  },
  { timestamps: true }
);

export const User = mongoose.model("User", userSchema);