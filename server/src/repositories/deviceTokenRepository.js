import DeviceToken
  from "../models/deviceTokenModel.js";

const registerDeviceToken = async ({
  userId,
  deviceId,
  platform,
  token,
}) => {

  return DeviceToken.findOneAndUpdate(
    {
      userId,
      deviceId,
    },
    {
      $set: {
        platform,
        token,
        active: true,
        lastSeenAt:
          new Date(),
      },
    },
    {
      new: true,
      upsert: true,
      setDefaultsOnInsert: true,
    }
  );

};

const getActiveTokensByUserId = async (
  userId
) => {

  return DeviceToken.find({
    userId,
    active: true,
  });

};

const updateDeviceToken = async ({
  deviceId,
  token,
}) => {

  return DeviceToken.findOneAndUpdate(
    {
      deviceId,
    },
    {
      $set: {
        token,
        lastSeenAt:
          new Date(),
      },
    },
    {
      new: true,
    }
  );

};

const deactivateDevice = async (
  deviceId
) => {

  return DeviceToken.findOneAndUpdate(
    {
      deviceId,
    },
    {
      $set: {
        active: false,
      },
    },
    {
      new: true,
    }
  );

};

const deactivateAllDevices = async (
  userId
) => {

  return DeviceToken.updateMany(
    {
      userId,
      active: true,
    },
    {
      $set: {
        active: false,
      },
    }
  );

};

export default {
  registerDeviceToken,
  getActiveTokensByUserId,
  updateDeviceToken,
  deactivateDevice,
  deactivateAllDevices,
};