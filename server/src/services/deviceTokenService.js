import deviceTokenRepository
  from "../repositories/deviceTokenRepository.js";

const registerDevice = async ({
  userId,
  deviceId,
  platform,
  token,
}) => {

  if (
    !userId ||
    !deviceId ||
    !platform ||
    !token
  ) {
    throw new Error(
      "Device registration data is required."
    );
  }

  return deviceTokenRepository
    .registerDeviceToken({
      userId,
      deviceId,
      platform,
      token,
    });

};

const getActiveDeviceTokens = async (
  userId
) => {

  if (!userId) {
    throw new Error(
      "User ID is required."
    );
  }

  return deviceTokenRepository
    .getActiveTokensByUserId(
      userId
    );

};

const refreshDeviceToken = async ({
  deviceId,
  token,
}) => {

  if (
    !deviceId ||
    !token
  ) {
    throw new Error(
      "Device ID and token are required."
    );
  }

  return deviceTokenRepository
    .updateDeviceToken({
      deviceId,
      token,
    });

};

const deactivateDevice = async (
  deviceId
) => {

  if (!deviceId) {
    throw new Error(
      "Device ID is required."
    );
  }

  return deviceTokenRepository
    .deactivateDevice(
      deviceId
    );

};

const deactivateAllDevices = async (
  userId
) => {

  if (!userId) {
    throw new Error(
      "User ID is required."
    );
  }

  return deviceTokenRepository
    .deactivateAllDevices(
      userId
    );

};

export default {
  registerDevice,
  getActiveDeviceTokens,
  refreshDeviceToken,
  deactivateDevice,
  deactivateAllDevices,
};