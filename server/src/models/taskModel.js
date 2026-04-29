import mongoose from "mongoose";

const witnessSchema = new mongoose.Schema(
  {
    name: String,
    phone: String,
    notified: { type: Boolean, default: false },
    notifiedAt: Date,
  },
  { _id: false }
);

const proofSchema = new mongoose.Schema(
  {
    url: String,
    geminiVerdict: String, // "ok"|"fake"|"unclear"
    submittedAt: Date,
  },
  { _id: false }
);

const escalationLogSchema = new mongoose.Schema(
  {
    at: Date,
    action: String,
    payload: String,
    outcome: String,
  },
  { _id: false }
);

const taskBoxSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    goal: { type: String, required: true },
    stakeType: { type: String, enum: ["photo", "text", "money"], required: true },
    stakeUrl: { type: String, required: true }, // link to photo/text/description
    witness: witnessSchema,
    deadline: { type: Date, required: true },
    status: { type: String, enum: ["pending", "done", "failed"], default: "pending" },
    level: { type: Number, default: 1 }, // Escalation progression (1-4)
    proof: proofSchema,
    escalationLog: [escalationLogSchema],
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

export const TaskBox = mongoose.model("TaskBox", taskBoxSchema);