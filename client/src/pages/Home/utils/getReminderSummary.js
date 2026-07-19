const getReminderSummary = (reminders) => {

  if (!reminders) {
    return null;
  }

  const {
    pending = 0,
    triggered = 0,
    expired = 0,
    nextReminder,
  } = reminders;

  return {

    eyebrow: "Reminder Status",

    title: "Upcoming Reminder",

    nextReminder: {

      label:
        nextReminder?.label ??
        "No Upcoming Reminder",

      scheduledAt:
        nextReminder?.scheduledAt ??
        "Not Scheduled",

      relativeLabel:
        nextReminder?.relativeLabel ??
        "",

    },

    stats: {

      pending,

      triggered,

      expired,

    },

    message:
      pending > 0
        ? "Rigga will remind you before your next checkpoint."
        : "No reminders are currently scheduled.",

  };

};

export default getReminderSummary;