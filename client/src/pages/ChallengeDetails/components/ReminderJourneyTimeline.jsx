import "./ReminderJourneyTimeline.css";

const ReminderJourneyTimeline = ({
  pending = 0,
  triggered = 0,
  expired = 0,
}) => {
  const total = pending + triggered + expired;

  const percentage =
    total > 0
      ? Math.round((triggered / total) * 100)
      : 0;

  return (
    <section className="reminder-health">

      <div className="reminder-health__header">

        <div>
          <p className="reminder-health__eyebrow">
            Reminder Health
          </p>

          <h3 className="reminder-health__title">
            {triggered} of {total} Reminders Triggered
          </h3>
        </div>

        <span className="reminder-health__percentage">
          {percentage}%
        </span>

      </div>

      <div className="reminder-health__track">

        <div
          className="reminder-health__fill"
          style={{
            width: `${percentage}%`,
          }}
        />

      </div>

      <div className="reminder-health__legend">

        <div className="reminder-health__item">

          <span className="reminder-health__dot reminder-health__dot--triggered" />

          <span>
            Triggered ({triggered})
          </span>

        </div>

        <div className="reminder-health__item">

          <span className="reminder-health__dot reminder-health__dot--pending" />

          <span>
            Pending ({pending})
          </span>

        </div>

        <div className="reminder-health__item">

          <span className="reminder-health__dot reminder-health__dot--expired" />

          <span>
            Expired ({expired})
          </span>

        </div>

      </div>

    </section>
  );
};

export default ReminderJourneyTimeline;