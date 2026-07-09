 
import { useParams } from "react-router-dom";

// css

import "./WitnessReview.css";

// Hooks
import useReviewSummary from "./hooks/useReviewSummary";
import useSubmitReview from "./hooks/useSubmitReview";

// State Components
import LoadingState from "./components/State/LoadingState";
import ErrorState from "./components/State/ErrorState";
import ReviewCompletedState from "./components/ReviewCompletedState";

function WitnessReview() {
  const { token } = useParams();

 

  const {
    data,
    loading: summaryLoading,
    error: summaryError,
  } = useReviewSummary(token);

 const {
  handleSubmitReview,
  loading,
  error,
  success,
  decision,
} = useSubmitReview();

  if (summaryLoading) {
    return <LoadingState />;
  }

  if (summaryError) {
    return (
      <ErrorState
        message={summaryError}
      />
    );
  }

  if (!data) {
    return null;
  }

  if (
  data.invitationStatus === "ACCEPTED" ||
  data.invitationStatus === "DECLINED" ||
  data.invitationStatus === "SUPERSEDED"
) {
  return (
    <ReviewCompletedState
      decision={data.invitationStatus}
    />
  );
}

  if (success) {
  return (
    <ReviewCompletedState
      decision={decision}
    />
  );
}

  return (
    <main className="witness-review-page">
      <div className="witness-review-page__container">
      <div className="witness-review-page__hero">

  <div className="witness-review-page__badge">
    Rigga Challenge Review
  </div>

  <h1 className="witness-review-page__title">
    Review this accountability challenge.
  </h1>

  <p className="witness-review-page__description">
    Your decision helps determine whether this
    commitment was successfully completed. Please
    review the challenge details carefully before
    making an honest and fair decision.
  </p>

</div>

 


       <section className="witness-review-page__card">

  <div className="witness-review-page__section">
    <h3>Commitment</h3>

    <p>
      {data.challenge.title}
    </p>
  </div>

  <div className="witness-review-page__section">
    <h3>Success Criteria</h3>

    <p>
      {data.challenge.successCriteria}
    </p>
  </div>

  <div className="witness-review-page__section">
    <h3>Deadline</h3>

    <p>
      {new Date(
        data.challenge.deadlineAt
      ).toLocaleDateString()}
    </p>
  </div>

  <div className="witness-review-page__section">
    <h3>Current Status</h3>

    <p>
      {data.challenge.status}
    </p>
  </div>

  </section>

  <section className="witness-review-page__progress">

  <h2 className="witness-review-page__section-title">
    Challenge Progress
  </h2>

  <div className="witness-review-page__progress-grid">

    <div className="witness-review-page__progress-card">
      <h3>Completed</h3>

      <p>
        {data.checkpoints.completed}
      </p>
    </div>

    <div className="witness-review-page__progress-card">
      <h3>Pending</h3>

      <p>
        {data.checkpoints.pending}
      </p>
    </div>

    <div className="witness-review-page__progress-card">
      <h3>Missed</h3>

      <p>
        {data.checkpoints.missed}
      </p>
    </div>

  </div>

</section>

<section className="witness-review-page__reports">

  <h2 className="witness-review-page__section-title">
    Progress Reports
  </h2>

  {data.progressReports.count === 0 ? (
    <p className="witness-review-page__empty">
      No progress reports were submitted for this
      challenge.
    </p>
  ) : (
    data.progressReports.reports.map((report) => (
      <div
        key={report.id}
        className="witness-review-page__report-card"
      >
        <h3>Progress Update</h3>

        <p>
          {report.notes || "No notes provided."}
        </p>

        {report.imageUrl && (
          <img
            src={report.imageUrl}
            alt="Progress evidence"
            className="witness-review-page__report-image"
          />
        )}

        <small>
          Submitted on{" "}
          {new Date(
            report.submittedAt
          ).toLocaleDateString()}
        </small>
      </div>
    ))
  )}

</section>

<section className="witness-review-page__responsibility">

  <h2 className="witness-review-page__section-title">
    Your Responsibility
  </h2>

  <div className="witness-review-page__responsibility-card">

    <p>
      You were invited because the challenge creator
      trusts your judgment. Please make your decision
      based on what you know about this commitment and
      the information provided above.
    </p>

    <ul className="witness-review-page__responsibility-list">

      <li>
        Review the commitment carefully.
      </li>

      <li>
        Consider the available progress and evidence.
      </li>

      <li>
        Approve only if you genuinely believe the
        commitment was completed.
      </li>

      <li>
        Reject only if you genuinely believe it was
        not completed.
      </li>

    </ul>

  </div>

</section>

       <section className="witness-review-page__decision">

  <h2 className="witness-review-page__section-title">
    Submit Your Decision
  </h2>

  <p className="witness-review-page__decision-text">
    Please choose the option that honestly reflects
    whether this commitment was successfully completed.
  </p>

  {error && (
    <p className="review-error">
      {error}
    </p>
  )}

  <div className="witness-review-page__actions">

    <button
      type="button"
      className="witness-review-page__approve-button"
      disabled={loading}
      onClick={() =>
        handleSubmitReview({
          token,
          decision: "APPROVED",
        })
      }
    >
      {loading
        ? "Submitting..."
        : "Approve Challenge"}
    </button>

   

  </div>

</section>
 

       

      

      </div>
    </main>
  );
}

export default WitnessReview;
