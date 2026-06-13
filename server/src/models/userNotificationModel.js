import mongoose from "mongoose";

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