 import { useState } from "react";
import { useParams } from "react-router-dom";

// Hooks
import useReviewSummary from "./hooks/useReviewSummary";
import useSubmitReview from "./hooks/useSubmitReview";

// State Components
import LoadingState from "./components/State/LoadingState";
import ErrorState from "./components/State/ErrorState";
import ReviewCompletedState from "./components/ReviewCompletedState";

function WitnessReview() {
  const { token } = useParams();

  const [name, setName] =
    useState("");

  const [phone, setPhone] =
    useState("");

  const {
    data,
    loading: summaryLoading,
    error: summaryError,
  } = useReviewSummary(token);

  const {
    handleAccept,
    handleDecline,
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

        <h1>
          Become a Witness
        </h1>

        <p>
          Review this invitation and
          decide whether you'd like to
          become the witness.
        </p>

        <div className="witness-review-card">

          <h3>Creator</h3>
          <p>
            {data.creatorName}
          </p>

          <h3>Commitment</h3>
          <p>
            {data.title}
          </p>

          <h3>Deadline</h3>
          <p>
            {data.deadlineAt}
          </p>

          <h3>
            Success Criteria
          </h3>
          <p>
            {data.successCriteria}
          </p>

        </div>

        <input
          type="text"
          placeholder="Your name"
          value={name}
          onChange={(e) =>
            setName(
              e.target.value
            )
          }
        />

        <input
          type="tel"
          placeholder="Phone number"
          value={phone}
          onChange={(e) =>
            setPhone(
              e.target.value
            )
          }
        />

        {error && (
          <p className="review-error">
            {error}
          </p>
        )}

        <div className="witness-review-actions">

          <button
            type="button"
            disabled={
              loading ||
              !name ||
              !phone
            }
            onClick={() =>
              handleAccept({
                token,
                name,
                phone,
              })
            }
          >
            {loading
              ? "Accepting..."
              : "Accept"}
          </button>

          <button
            type="button"
            disabled={loading}
            onClick={() =>
              handleDecline(
                token
              )
            }
          >
            {loading
              ? "Declining..."
              : "Decline"}
          </button>

        </div>

      </div>
    </main>
  );
}

export default WitnessReview;
