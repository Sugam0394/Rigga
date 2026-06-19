import mongoose from "mongoose";

const appealSchema = new mongoose.Schema(
    {
      challengeId: {
        type:
          mongoose.Schema.Types.ObjectId,
        ref: "Challenge",
        required: true,
      },

      notes: {
        type: String,
        required: true,
      },

      imageUrl: {
        type: String,
        default: null,
      },

      submittedAt: {
        type: Date,
        default: Date.now,
      },
    },
    {
      timestamps: true,
    }
  );

export default mongoose.model(
  "Appeal",
  appealSchema
);