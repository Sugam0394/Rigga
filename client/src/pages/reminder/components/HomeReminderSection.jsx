 import "./HomeReminderSection.css";

const HomeReminderSection = ({
  reminders,
}) => {

  if (!reminders) {
    return null;
  }

  return (

    <section
      className="home-reminder-section"
      aria-labelledby="home-reminder-heading"
    >

      <header
        className="home-reminder-section__header"
      >

        <h2
          id="home-reminder-heading"
          className="home-reminder-section__title"
        >
          Reminder Summary
        </h2>

      </header>

      <div
        className="home-reminder-section__content"
      >

        <div
          className="home-reminder-section__row"
        >
          <span>
            Pending
          </span>

          <strong>
            {reminders.pending ?? 0}
          </strong>
        </div>

        <div
          className="home-reminder-section__row"
        >
          <span>
            Triggered
          </span>

          <strong>
            {reminders.triggered ?? 0}
          </strong>
        </div>

        <div
          className="home-reminder-section__row"
        >
          <span>
            Expired
          </span>

          <strong>
            {reminders.expired ?? 0}
          </strong>
        </div>

      </div>

    </section>

  );

};

export default HomeReminderSection;