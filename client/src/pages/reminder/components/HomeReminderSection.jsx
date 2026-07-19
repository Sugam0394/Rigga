 import "./HomeReminderSection.css";

const HomeReminderSection = ({
  reminderSummary,
}) => {

  if (!reminderSummary) {
    return null;
  }

  const {
    eyebrow,
    title,
    nextReminder,
    stats,
    message,
  } = reminderSummary;

  return (

    <section
      className="home-reminder-section"
      aria-labelledby="home-reminder-heading"
    >

      {/* Header */}

      <header
        className="home-reminder-section__header"
      >

        <p
          className="home-reminder-section__eyebrow"
        >
          {eyebrow}
        </p>

        <h2
          id="home-reminder-heading"
          className="home-reminder-section__title"
        >
          {title}
        </h2>

      </header>

      {/* Next Reminder */}

      <div
        className="home-reminder-section__next"
      >

        <div
          className="home-reminder-section__icon"
        >
          ⏰
        </div>

        <div>

          <p
            className="home-reminder-section__next-label"
          >
            {nextReminder.label}
          </p>

          <p
            className="home-reminder-section__next-time"
          >
            {nextReminder.relativeLabel}
            {nextReminder.relativeLabel &&
            nextReminder.scheduledAt
              ? " • "
              : ""}
            {nextReminder.scheduledAt}
          </p>

        </div>

      </div>

      {/* Statistics */}

      <div
        className="home-reminder-section__stats"
      >

        <div
          className="home-reminder-section__stat"
        >
          <span>Pending</span>

          <strong>
            {stats.pending}
          </strong>
        </div>

        <div
          className="home-reminder-section__stat"
        >
          <span>Triggered</span>

          <strong>
            {stats.triggered}
          </strong>
        </div>

        <div
          className="home-reminder-section__stat"
        >
          <span>Expired</span>

          <strong>
            {stats.expired}
          </strong>
        </div>

      </div>

      {/* Footer */}

      <footer
        className="home-reminder-section__footer"
      >

        <p
          className="home-reminder-section__message"
        >
          {message}
        </p>

      </footer>

    </section>

  );

};

export default HomeReminderSection;