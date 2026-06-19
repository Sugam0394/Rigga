import mongoose from "mongoose";

import { CHECKPOINT_STATUS }
  from "../constants/checkpointConstants.js";

const checkpointSchema =  new mongoose.Schema(
    {
      challengeId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Challenge",
        required: true,
      },

      checkpointNumber: {
        type: Number,
        required: true,
      },

      scheduledDate: {
        type: Date,
        required: true,
      },

      status: {
        type: String,
        enum: Object.values(
          CHECKPOINT_STATUS
        ),
        default:
          CHECKPOINT_STATUS.PENDING,
      },
    },
    {
      timestamps: true,
    }
  );

export default mongoose.model(
  "Checkpoint",
  checkpointSchema
);