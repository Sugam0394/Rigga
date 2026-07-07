const createNotificationEvent = ({
  eventType,
  sourceEngine,
  userId,
  entityType = null,
  entityId = null,
  payload = {},
}) => {
  return {
    version: 1,
    eventType,
    sourceEngine,
    userId,
    entityType,
    entityId,
    payload,
    createdAt: new Date(),
  };
};

export default {
  createNotificationEvent,
};