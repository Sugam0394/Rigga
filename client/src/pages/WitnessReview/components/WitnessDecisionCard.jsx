const WitnessDecisionCard = ({
  decision,
  onDecisionChange,
}) => {
  return (
    <div>
      <h3>
        Witness Decision
      </h3>

      <button
        type="button"
        onClick={() =>
          onDecisionChange(
            "APPROVED"
          )
        }
      >
        Approve Challenge
      </button>

      <button
        type="button"
        onClick={() =>
          onDecisionChange(
            "REJECTED"
          )
        }
      >
        Reject Challenge
      </button>

      {decision && (
        <p>
          Selected:
          {" "}
          {decision}
        </p>
      )}
    </div>
  );
};

export default WitnessDecisionCard;