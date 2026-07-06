import notificationDispatcher from "./notificationDispatcher.js";

const onReminderTriggered = async ({
  reminder,
  challenge,
  decision,
}) => {
  const reminderEvent = {
    reminderId: reminder._id,

    challengeId: challenge._id,

    userId: challenge.userId,

    urgency: decision.urgency,

    tone: decision.tone,

    observationMode:
      decision.observationMode,

    reminderType:
      reminder.type,

    scheduledFor:
      reminder.scheduledAt,
  };

  try {
    await notificationDispatcher
      .dispatchReminder(
        reminderEvent
      );
  } catch (error) {
    console.error(
      "[REMINDER COORDINATOR ERROR]",
      error
    );
  }
};

export default {
  onReminderTriggered,
};