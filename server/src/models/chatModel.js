import mongoose from "mongoose";

const chatMessageSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },

  role: {
    type: String,
    enum: ["user", "ai"],
    required: true,
  },

  text: {
    type: String,
    required: true,
  },

  createdAt: {
    type: Date,
    default: Date.now,
  },
});

chatMessageSchema.index({ userId: 1, createdAt: 1 });

export const ChatMessage = mongoose.model(
  "ChatMessage",
  chatMessageSchema
);