import mongoose from "mongoose";

const progressReportSchema =  new mongoose.Schema(
    {
  challengeId: {
  type: mongoose.Schema.Types.ObjectId,
  ref: "Challenge",
  required: true,
  index: true,
  immutable: true,
},

userId: {
  type: mongoose.Schema.Types.ObjectId,
  ref: "User",
  required: true,
  index: true,
  immutable: true,
},

    notes: {
  type: String,
  required: true,
  immutable: true,
},

imageUrl: {
  type: String,
  default: null,
  immutable: true,
},

submittedAt: {
  type: Date,
  default: Date.now,
  immutable: true,
},
     
    },
    {
      timestamps: true,
    }
  );
  progressReportSchema.index({
  challengeId: 1,
  userId: 1,
  createdAt: -1,
});

const ProgressReport = mongoose.model(
  "ProgressReport",
  progressReportSchema
);

 

export default ProgressReport;