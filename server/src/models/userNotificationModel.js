import mongoose from "mongoose";
import {
  DELIVERY_STATUS,
} from "../constants/deliveryStatusConstant.js";


const userNotificationSchema = new mongoose.Schema(
    {
      userId: {
        type:
          mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
        index: true,
      },

      type: {
        type: String,
        required: true,
      },

      title: {
        type: String,
        required: true,
      },

      message: {
        type: String,
        required: true,
      },

      isRead: {
        type: Boolean,
        default: false,
      },

      delivery: {

  channel: {
    type: String,
    default: "IN_APP",
  },

 status: {
  type: String,
  enum: Object.values(
    DELIVERY_STATUS
  ),
  default:
    DELIVERY_STATUS.PENDING,
},

  reason: {
    type: String,
    default: null,
  },

  attemptedAt: {
    type: Date,
    default: null,
  },

  deliveredAt: {
    type: Date,
    default: null,
  },

  attempts: {
    type: Number,
    default: 0,
  },
},

      entityType: {
        type: String,
        default: null,
      },

      entityId: {
        type:
          mongoose.Schema.Types.ObjectId,
        default: null,
      },
    },
    {
      timestamps: true,
    }
  );

userNotificationSchema.index({
  userId: 1,
  isRead: 1,
});

export const UserNotification =
  mongoose.model(
    "UserNotification",
    userNotificationSchema
  );