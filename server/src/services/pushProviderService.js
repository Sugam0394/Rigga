const sendPushNotification = async ({
  notification,
  deviceTokens,
}) => {

  /*
   * NB7.5
   *
   * Push Provider Service
   *
   * This service is the only
   * provider integration point.
   *
   * Future implementations:
   *
   * - Firebase Cloud Messaging
   * - Apple Push Notification Service
   * - OneSignal
   * - AWS SNS
   *
   * PushAdapter must never know
   * which provider is being used.
   */

  return {

    delivered: false,

    provider: null,

    status:
      "PENDING_PROVIDER",

    reason:
      "Push provider is not integrated yet.",

    deviceCount:
      deviceTokens.length,

    attemptedAt:
      new Date(),

    deliveredAt:
      null,
  };

};

export default {
  sendPushNotification,
};