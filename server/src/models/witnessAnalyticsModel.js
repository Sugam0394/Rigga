import mongoose from "mongoose";

import { WITNESS_ANALYTICS_EVENTS } from "../constants/witnessAnalyticsEvents.js";

const witnessAnalyticsSchema = new mongoose.Schema(
    {
      challengeId: {
        type:
          mongoose.Schema.Types
            .ObjectId,

        ref: "Challenge",

        required: true,
      },

      eventType: {
        type: String,

        enum: Object.values(
          WITNESS_ANALYTICS_EVENTS
        ),

        required: true,
      },

      metadata: {
        type: mongoose.Schema.Types.Mixed,

        default: {},
      },
    },
    {
      timestamps: true,
    }
  );

export default mongoose.model(
  "WitnessAnalytics",
  witnessAnalyticsSchema
);