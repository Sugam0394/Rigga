import "./CheckpointJourneyProgress.css";

const CheckpointJourneyProgress = ({
  total,
  completed,
  pending,
  missed,
}) => {
  const percentage =
    total > 0
      ? Math.round((completed / total) * 100)
      : 0;

  return (
    <section className="checkpoint-progress">

      <div className="checkpoint-progress__header">

        <div>
          <p className="checkpoint-progress__eyebrow">
            Overall Journey
          </p>

          <h3 className="checkpoint-progress__title">
            {completed} of {total} Checkpoints Completed
          </h3>
        </div>

        <span className="checkpoint-progress__percentage">
          {percentage}%
        </span>

      </div>

      <div className="checkpoint-progress__track">

        <div
          className="checkpoint-progress__fill"
          style={{
            width: `${percentage}%`,
          }}
        />

      </div>

      <div className="checkpoint-progress__legend">

        <div className="checkpoint-progress__item">

          <span className="checkpoint-progress__dot checkpoint-progress__dot--completed" />

          <span>
            Completed ({completed})
          </span>

        </div>

        <div className="checkpoint-progress__item">

          <span className="checkpoint-progress__dot checkpoint-progress__dot--pending" />

          <span>
            Pending ({pending})
          </span>

        </div>

        <div className="checkpoint-progress__item">

          <span className="checkpoint-progress__dot checkpoint-progress__dot--missed" />

          <span>
            Missed ({missed})
          </span>

        </div>

      </div>

    </section>
  );
};

export default CheckpointJourneyProgress;