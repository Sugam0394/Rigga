import mongoose from "mongoose";

const deviceTokenSchema = new mongoose.Schema(
    {
      userId: {
        type:
          mongoose.Schema.Types.ObjectId,

        ref: "User",

        required: true,

        index: true,
      },

      deviceId: {
        type: String,

        required: true,

        trim: true,
      },

      platform: {
        type: String,

        required: true,

        enum: [
          "ANDROID",
          "IOS",
          "WEB",
        ],
      },

      token: {
        type: String,

        required: true,

        unique: true,

        trim: true,
      },

      active: {
        type: Boolean,

        default: true,
      },

      lastSeenAt: {
        type: Date,

        default:
          Date.now,
      },
    },
    {
      timestamps: true,
    }
  );

/*
 * One user may own
 * multiple devices.
 *
 * One physical device
 * should only have one
 * active registration.
 */
deviceTokenSchema.index({
  userId: 1,
  deviceId: 1,
});

export default mongoose.model(
  "DeviceToken",
  deviceTokenSchema
);