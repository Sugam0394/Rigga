 import "./CheckpointSummaryCard.css";

const CheckpointSummaryCard = ({
  checkpoints,
}) => {
  return (
    <section className="checkpoint-card">
     <h2 className="checkpoint-card__title">
  Checkpoint Journey
</h2>

      <div className="checkpoint-card__stats">
        <div className="checkpoint-card__stat">
          <p className="checkpoint-card__label">
            Total Checkpoints
          </p>
          <p className="checkpoint-card__value">
            {checkpoints.total}
          </p>
        </div>

        <div className="checkpoint-card__stat">
          <p className="checkpoint-card__label">
            Completed Checkpoints
          </p>
          <p className="checkpoint-card__value">
            {checkpoints.completed}
          </p>
        </div>

        <div className="checkpoint-card__stat">
           <p className="checkpoint-card__label">
  Pending Checkpoints
</p>
          <p className="checkpoint-card__value">
            {checkpoints.pending}
          </p>
        </div>

        <div className="checkpoint-card__stat">
          <p className="checkpoint-card__label">
           Missed Checkpoints
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