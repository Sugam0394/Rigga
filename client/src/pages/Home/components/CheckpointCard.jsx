const CheckpointCard = ({
  deadline,
}) => {
  return (
    <div>
      <h3>
        Next Checkpoint
      </h3>

      <p>
        {new Date(
          deadline
        ).toLocaleDateString()}
      </p>
    </div>
  );
};

export default CheckpointCard;