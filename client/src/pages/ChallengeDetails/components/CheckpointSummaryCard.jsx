 import "./CheckpointSummaryCard.css";

const CheckpointSummaryCard = ({
  checkpoints,
}) => {
  return (
    <section className="checkpoint-card">
      <h2 className="checkpoint-card__title">
        Checkpoints
      </h2>

      <div className="checkpoint-card__stats">
        <div className="checkpoint-card__stat">
          <p className="checkpoint-card__label">
            Total
          </p>
          <p className="checkpoint-card__value">
            {checkpoints.total}
          </p>
        </div>

        <div className="checkpoint-card__stat">
          <p className="checkpoint-card__label">
            Completed
          </p>
          <p className="checkpoint-card__value">
            {checkpoints.completed}
          </p>
        </div>

        <div className="checkpoint-card__stat">
          <p className="checkpoint-card__label">
            Pending
          </p>
          <p className="checkpoint-card__value">
            {checkpoints.pending}
          </p>
        </div>

        <div className="checkpoint-card__stat">
          <p className="checkpoint-card__label">
            Missed
          </p>
          <p className="checkpoint-card__value">
            {checkpoints.missed}
          </p>
        </div>
      </div>
    </section>
  );
};

export default CheckpointSummaryCard;