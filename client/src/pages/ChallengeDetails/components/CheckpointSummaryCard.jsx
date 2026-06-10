const CheckpointSummaryCard = ({
  checkpoints,
}) => {
  return (
    <section>
      <h2>
        Checkpoints
      </h2>

      <p>
        Total: {checkpoints.total}
      </p>

      <p>
        Completed: {checkpoints.completed}
      </p>

      <p>
        Pending: {checkpoints.pending}
      </p>

      <p>
        Missed: {checkpoints.missed}
      </p>
    </section>
  );
};

export default CheckpointSummaryCard;