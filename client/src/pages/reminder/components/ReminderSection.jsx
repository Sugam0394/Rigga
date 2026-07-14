 import "./ReminderSection.css";

const ReminderSection = ({
  reminder,
}) => {

  if (reminder.loading) {
    return (
      <section
        className="reminder-section"
        aria-live="polite"
      >
        <h2 className="reminder-section__title">
          Reminders
        </h2>

        <p
          className="reminder-section__message"
          role="status"
        >
          Loading reminder information...
        </p>
      </section>
    );
  }

  if (reminder.error) {
    return (
      <section className="reminder-section">
        <h2 className="reminder-section__title">
          Reminders
        </h2>

        <p
          className="reminder-section__error"
          role="alert"
        >
          {reminder.error}
        </p>
      </section>
    );
  }

  const noReminderData =
    !reminder.status &&
    !reminder.decision &&
    reminder.reminders.length === 0 &&
    reminder.history.length === 0;

  if (noReminderData) {
    return (
      <section className="reminder-section">
        <h2 className="reminder-section__title">
          Reminders
        </h2>

        <p className="reminder-section__empty">
          Reminder information is not available yet.
        </p>
      </section>
    );
  }

  return (
    <section className="reminder-section">

      <header className="reminder-section__header">
        <h2 className="reminder-section__title">
          Reminders
        </h2>
      </header>

      <div className="reminder-section__content">

        <div className="reminder-section__row">
          <span>Pending</span>
          <strong>
            {reminder.status?.pendingCount ?? 0}
          </strong>
        </div>

        <div className="reminder-section__row">
          <span>Triggered</span>
          <strong>
            {reminder.status?.triggeredCount ?? 0}
          </strong>
        </div>

        <div className="reminder-section__row">
          <span>Expired</span>
          <strong>
            {reminder.status?.expiredCount ?? 0}
          </strong>
        </div>

        <div className="reminder-section__row">
          <span>Decision</span>
          <strong>
            {reminder.decision?.reason ??
              "No reminder decision"}
          </strong>
        </div>

        <div className="reminder-section__row">
          <span>Total Reminders</span>
          <strong>
            {reminder.reminders.length}
          </strong>
        </div>

        <div className="reminder-section__row">
          <span>History Entries</span>
          <strong>
            {reminder.history.length}
          </strong>
        </div>

      </div>

    </section>
  );
};

export default ReminderSection;