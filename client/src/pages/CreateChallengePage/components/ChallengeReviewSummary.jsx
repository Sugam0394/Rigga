 import "./ChallengeReviewSummary.css";

const ChallengeReviewSummary = ({
  formData,
}) => {
  return (
    <section className="challenge-review-summary">
      <h3 className="challenge-review-summary__title">
        Review Your Commitment
      </h3>

      <div className="challenge-review-summary__item">
        <span className="challenge-review-summary__label">
          Commitment
        </span>

        <p className="challenge-review-summary__value">
          {formData.title}
        </p>
      </div>

      <div className="challenge-review-summary__item">
        <span className="challenge-review-summary__label">
          Deadline
        </span>

        <p className="challenge-review-summary__value">
          {formData.deadlineAt}
        </p>
      </div>

      <div className="challenge-review-summary__item">
        <span className="challenge-review-summary__label">
          Success Criteria
        </span>

        <p className="challenge-review-summary__value">
          {formData.successCriteria}
        </p>
      </div>

      <div className="challenge-review-summary__item">
        <span className="challenge-review-summary__label">
          Witness
        </span>

        <p className="challenge-review-summary__value">
          {formData.witnessName}
        </p>
      </div>

      <div className="challenge-review-summary__item">
        <span className="challenge-review-summary__label">
          Private Consequence
        </span>

        <p className="challenge-review-summary__value">
          {formData.privateMessage}
        </p>
      </div>
    </section>
  );
};

export default ChallengeReviewSummary;