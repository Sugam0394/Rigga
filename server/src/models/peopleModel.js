import mongoose from "mongoose";

const peopleSchema = new mongoose.Schema({
  phone: { type: String, required: true, unique: true, index: true }, // WhatsApp ID
  name: String,
  joinDate: { type: Date, default: Date.now },
  activeTaskBox: { type: mongoose.Schema.Types.ObjectId, ref: "TaskBox" }, // points to current
  taskBoxes: [{ type: mongoose.Schema.Types.ObjectId, ref: "TaskBox" }],
  totalWins: { type: Number, default: 0 },
  totalFails: { type: Number, default: 0 },
});

export const People = mongoose.model("People", peopleSchema);