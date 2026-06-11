import { useState } from "react";
import { useParams } from "react-router-dom";
// Components
import ReviewCompletedState from "./components/ReviewCompletedState";
import ReviewHeader from "./components/ReviewHeader";
import CommitmentSummaryCard from "./components/CommitmentSummaryCard";
import ProgressEvidenceTimeline from "./components/ProgressEvidenceTimeline";
import WitnessDecisionCard from "./components/WitnessDecisionCard";
import RejectionReasonForm from "./components/RejectReasonForm";

// Hooks
import useSubmitReview from "./hooks/useSubmitReview";
import useReviewSummary from "./hooks/useReviewSummary";

// State Components
import LoadingState from "./components/State/LoadingState";
import ErrorState from "./components/State/ErrorState";

function WitnessReview() {
const [decision, setDecision] = useState("");
const [reason, setReason] = useState("");

 const { id } = useParams();

const challengeId = id;

const {
data,
loading: summaryLoading,
error: summaryError,
} = useReviewSummary(challengeId);

const {
loading,
error,
success,
} = useSubmitReview();

const validateRejectionReason = (reason) => {

 const trimmed = reason.trim();

if (!trimmed) {
  return "Rejection reason is required";
}

```
if (!trimmed) {
  return "Rejection reason is required";
}

const wordCount =
  trimmed.split(/\s+/).length;

if (wordCount < 30) {
  return "Minimum 30 words required";
}

if (wordCount > 200) {
  return "Maximum 200 words allowed";
}

return "";
```

};

const onSubmit = async () => {
if (!decision) {
return;
}

```
if (decision === "REJECTED") {
  const validationError =
    validateRejectionReason(reason);

  if (validationError) {
    return;
  }
}

await handleSubmit({
  challengeId: data._id,
  decision,
  rejectionReason:
    decision === "REJECTED"
      ? reason
      : undefined,
});
```

};

if (summaryLoading) {
return <LoadingState />;
}

if (summaryError) {
return ( <ErrorState
     message={summaryError}
   />
);
}

if (!data) {
return null;
}

if (success) {
return ( <ReviewCompletedState
     decision={decision}
   />
);
}

return ( <div> <ReviewHeader
     title={data.title}
     status={data.status}
   />

```
  <CommitmentSummaryCard
    title={data.title}
    successCriteria={
      data.successCriteria
    }
    deadlineAt={data.deadlineAt}
    witnessName={
      data.witness?.name
    }
    consequenceStatus={
      data.consequenceStatus
    }
  />

  <ProgressEvidenceTimeline
    reports={
      data.progressReports || []
    }
  />

  <WitnessDecisionCard
    decision={decision}
    onDecisionChange={
      setDecision
    }
  />

  {decision === "REJECTED" && (
    <RejectionReasonForm
      reason={reason}
      onReasonChange={
        setReason
      }
      error={validateRejectionReason(
        reason
      )}
    />
  )}

  <button
    type="button"
    disabled={
      loading || !decision
    }
    onClick={onSubmit}
  >
    {loading
      ? "Submitting..."
      : "Submit Review"}
  </button>

  {error && (
    <p>{error}</p>
  )}
</div>
 

);
}

export default WitnessReview;
