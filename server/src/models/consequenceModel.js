import mongoose from "mongoose";

const consequenceSchema = new mongoose.Schema(
  {
    challengeId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Challenge",
      required: true,
    },

    privateMessage: {
      type: String,
      required: true,
    },

    isLocked: {
      type: Boolean,
      default: true,
    },

    isReleased: {
      type: Boolean,
      default: false,
    },

    releasedAt: {
      type: Date,
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

const Consequence = mongoose.model(
  "Consequence",
  consequenceSchema
);

export default Consequence;