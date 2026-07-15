 import {
  DELIVERY_STATUS,
} from "../constants/deliveryStatusConstant.js";

import userNotificationRepository
  from "../repositories/userNotificationRepository.js";

const deliverNotification = async (
  notification
) => {

   

  try {

    const deliveryResult = {

      delivered: true,

      channel: "IN_APP",

      status:
        DELIVERY_STATUS.DELIVERED,

      reason: "SUCCESS",

      attemptedAt:
        new Date(),

      deliveredAt:
        new Date(),
    };

    await userNotificationRepository
      .updateDeliveryOutcome(
        notification._id,
        deliveryResult
      );

    console.log(
      "[NOTIFICATION DELIVERY COMPLETED]",
      notification._id
    );

    return deliveryResult;

  } catch (error) {

    const deliveryResult = {

      delivered: false,

      channel: "IN_APP",

      status:
        DELIVERY_STATUS.FAILED,

      reason:
        error.message,

      attemptedAt:
        new Date(),

      deliveredAt:
        null,
    };

    await userNotificationRepository
      .updateDeliveryOutcome(
        notification._id,
        deliveryResult
      );

    console.error(
      "[NOTIFICATION DELIVERY FAILED]",
      notification._id,
      error
    );

    // Never break notification creation.
    return deliveryResult;
  }
};

export default {
  deliverNotification,
};