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
    geminiVerdict: { 
      type: String, 
      enum: ["ok", "fake", "unclear", "none"], 
      default: "none" 
    },
    submittedAt: Date,
  },
  { _id: false }
);

const escalationLogSchema = new mongoose.Schema(
  {
    at: { type: Date, default: Date.now },
    action: String,
    payload: String,
    outcome: String,
  },
  { _id: false }
);

const taskBoxSchema = new mongoose.Schema(
  {
    userId: { 
      type: mongoose.Schema.Types.ObjectId, 
      ref: "User", 
      required: true 
    },

    goal: { 
      type: String, 
      required: true 
    },

    stakeType: { 
      type: String, 
      enum: ["photo", "text", "money"], 
      default: "photo"
    },

    stakeUrl: { 
      type: String, 
      default: "pending"
    },

    witness: witnessSchema,

    deadline: { 
      type: Date, 
      required: true,
      default: () => new Date(Date.now() + 24 * 60 * 60 * 1000)
    },

    status: { 
      type: String, 
      enum: ["pending", "done", "failed"], 
      default: "pending" 
    },

    level: { 
      type: Number, 
      default: 1 
    },

    proof: proofSchema,

    escalationLog: [escalationLogSchema],
  },
  { timestamps: true }
);

// 🔥 Performance Index (important for scaling)
taskBoxSchema.index({ userId: 1 });

export const TaskBox = mongoose.model("TaskBox", taskBoxSchema);