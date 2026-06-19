const CommitmentSummaryCard = ({
  title,
  successCriteria,
  deadlineAt,
  witnessName,
  consequenceStatus,
}) => {
  return (
    <div>
      <h3>Commitment Summary</h3>

      <p>
        <strong>Title:</strong>
        {" "}
        {title}
      </p>

      <p>
        <strong>Success Criteria:</strong>
        {" "}
        {successCriteria}
      </p>

      <p>
        <strong>Deadline:</strong>
        {" "}
        {deadlineAt}
      </p>

      <p>
        <strong>Witness:</strong>
        {" "}
        {witnessName}
      </p>

      <p>
        <strong>Consequence Status:</strong>
        {" "}
        {consequenceStatus}
      </p>
    </div>
  );
};

export default CommitmentSummaryCard;