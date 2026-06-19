const CheckpointCard = ({
  deadlineAt,
}) => {
  return (
    <div>
      <h3>
        Next Checkpoint
      </h3>

      <p>
        {new Date(
          deadlineAt
        ).toLocaleDateString()}
      </p>
    </div>
  );
};

export default CheckpointCard;