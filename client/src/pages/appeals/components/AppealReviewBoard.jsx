import "./AppealReviewBoard.css";

const AppealReviewBoard = ({
  status = "UNDER REVIEW",
  estimatedReview = "24 Hours",
  submitted = true,
}) => {
  return (
    <section className="appeal-review">

      <div className="appeal-review__board">

        <p className="appeal-review__label">
          Current Status
        </p>

        <h3 className="appeal-review__status">
          {status}
        </h3>

        <div className="appeal-review__divider" />

        <p className="appeal-review__label">
          Estimated Review
        </p>

        <p className="appeal-review__time">
          {estimatedReview}
        </p>

      </div>

      <div className="appeal-review__footer">

        <div className="appeal-review__row">

          <span>
            Submitted
          </span>

          <strong>
            {submitted ? "✔" : "—"}
          </strong>

        </div>

        <div className="appeal-review__row">

          <span>
            Decision
          </span>

          <strong>
            Waiting
          </strong>

        </div>

      </div>

    </section>
  );
};

export default AppealReviewBoard;