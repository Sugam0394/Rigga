import mongoose from "mongoose";

const progressReportSchema =  new mongoose.Schema(
    {
       challengeId: {
  type: mongoose.Schema.Types.ObjectId,
  ref: "Challenge",
  required: true,
  index: true,
},

userId: {
  type: mongoose.Schema.Types.ObjectId,
  ref: "User",
  required: true,
  index: true,
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

const ProgressReport = mongoose.model(
  "ProgressReport",
  progressReportSchema
);

export default ProgressReport;