import mongoose from "mongoose";

const witnessSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    witnessNumber: {
      type: String, // e.g. +91xxxxxxx
      required: true,
    },

    whatsappNumber: {
      type: String, // e.g. whatsapp:+91xxxxxxx
      required: true,
    },

    isActive: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

export const Witness = mongoose.model("Witness", witnessSchema);