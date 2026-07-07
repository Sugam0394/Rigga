import notificationFactory
  from "./notificationEvents.js";

const resolveNotificationTemplate = (
  notificationEvent
) => {

  const {
    eventType,
  } = notificationEvent;

  return notificationFactory
    .buildNotification({
      type:
        eventType,
    });
};

export default {
  resolveNotificationTemplate,
};