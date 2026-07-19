 import "./CheckpointSummaryCard.css";
import CheckpointJourneyProgress from "./CheckPointJourneyProgress";
const CheckpointSummaryCard = ({
  checkpoints,
}) => {
  return (
   <section className="checkpoint-card">

  <div className="checkpoint-card__header">

    <p className="checkpoint-card__eyebrow">
      Accountability Journey
    </p>

    <h2 className="checkpoint-card__title">
      Checkpoint Journey
    </h2>

    <p className="checkpoint-card__description">
      Track how consistently this commitment has progressed through scheduled accountability checkpoints.
    </p>

  </div>

  <CheckpointJourneyProgress
  total={checkpoints.total}
  completed={checkpoints.completed}
  pending={checkpoints.pending}
  missed={checkpoints.missed}
/>

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