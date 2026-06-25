 import challengeStatusLabels from "../../../constants/ChallengeStatusLabels";
import "./ChallengeStatusCard.css";


 const STATUS_CONTEXT = {
  ACTIVE:
    "Your commitment is active. Continue submitting evidence to stay accountable.",

  UNDER_REVIEW:
    "Your evidence has been submitted and is currently being reviewed by your witness.",

  REJECTED:
    "Your witness rejected this commitment. Review the decision and appeal if appropriate.",

  APPEALED:
    "Your appeal is under review. Await the final accountability outcome.",

  FAILED:
    "This commitment ended without successful verification.",

  COMPLETED:
    "Your commitment has been successfully verified by your witness.",
};
const STATUS_VARIANTS = {
  ACTIVE: "success",
  UNDER_REVIEW: "warning",
  REJECTED: "danger",
  APPEALED: "purple",
  FAILED: "neutral",
  COMPLETED: "success",
};

const ChallengeStatusCard = ({
  status,
}) => {
  const label =
    challengeStatusLabels[status] ||
    "Unknown Status";

  const variant =
    STATUS_VARIANTS[status] ||
    "neutral";

  return (
    <section className="challenge-status">
      <h2 className="challenge-status__title">
  Current Accountability State
</h2>

      <span
        className={`challenge-status__badge challenge-status__badge--${variant}`}
      >
        {label}
      </span>
     <p className="challenge-status__context">
  {STATUS_CONTEXT[status] ??
    "Current accountability state unavailable."}
</p>
    </section>
  );
};

export default ChallengeStatusCard;