import mongoose from "mongoose";
 import {
  NOTIFICATION_STATUS, } from "../constants/notificationConstants.js";

const notificationSchema = new mongoose.Schema(
  {
    challengeId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Challenge",
      required: true,
      index: true,
    },

    recipientType: {
      type: String,
      required: true,
    },

    recipientPhone: {
      type: String,
      required: true,
    },

    type: {
      type: String,
      required: true,
       
    },

    message: {
      type: String,
      required: true,
    },

    status: {
  type: String,
  required: true,
  enum: ["PENDING", "SENT", "FAILED"],
  default: "PENDING",
},

    sentAt: {
      type: Date,
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

const Notification = mongoose.model(
  "Notification",
  notificationSchema
);

export default Notification;