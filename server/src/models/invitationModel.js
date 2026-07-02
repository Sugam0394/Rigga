 import mongoose from "mongoose";

const invitationSchema = new mongoose.Schema(
  {
    challengeId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Challenge",
      required: true,
      index: true,
    },

    token: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },

   status: {
  type: String,
  enum: [
    "ACTIVE",
    "SUPERSEDED",
    "ACCEPTED",
    "DECLINED",
  ],
  default: "ACTIVE",
},

    expiresAt: {
      type: Date,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Invitation = mongoose.model(
  "Invitation",
  invitationSchema
);

export default Invitation;