 import deviceTokenService
  from "../services/deviceTokenService.js";

import pushProviderService
  from "../services/pushProviderService.js";

const send = async (
  notification
) => {

  try {

    const deviceTokens =
      await deviceTokenService
        .getActiveDeviceTokens(
          notification.userId
        );

    const deliveryResult =
      await pushProviderService
        .sendPushNotification({
          notification,
          deviceTokens,
        });

    return {

      ...deliveryResult,

      channel: "PUSH",

    };

  } catch (error) {

    return {

      delivered: false,

      channel: "PUSH",

      status:
        "FAILED",

      reason:
        error.message,

      attemptedAt:
        new Date(),

      deliveredAt:
        null,
    };

  }

};

export default {
  send,
};