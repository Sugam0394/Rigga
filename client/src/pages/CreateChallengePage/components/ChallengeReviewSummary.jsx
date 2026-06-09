const ChallengeReviewSummary = ({
  formData,
}) => {
  return (
    <div>
      <h3>
        Review Your Commitment
      </h3>

      <p>
        <strong>
          Commitment:
        </strong>{" "}
        {formData.title}
      </p>

      <p>
        <strong>
          Deadline:
        </strong>{" "}
        {formData.deadline}
      </p>

      <p>
        <strong>
          Witness:
        </strong>{" "}
        {formData.witnessName}
      </p>

      <p>
        <strong>
          Success Criteria:
        </strong>{" "}
        {
          formData.successCriteria
        }
      </p>
    </div>
  );
};

export default ChallengeReviewSummary;