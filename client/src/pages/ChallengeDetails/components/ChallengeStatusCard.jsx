 import challengeStatusLabels from "../../../constants/ChallengeStatusLabels";
import "./ChallengeStatusCard.css";


const STATUS_CONTEXT = {
  ACTIVE:
    "You are currently working toward this commitment.",

  UNDER_REVIEW:
    "Your witness is reviewing submitted evidence.",

  REJECTED:
    "Your witness rejected this commitment.",

  APPEALED:
    "This commitment is under appeal review.",

  FAILED:
    "This commitment was not successfully completed.",

  COMPLETED:
    "This commitment has been successfully verified.",
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
        Current Status
      </h2>

      <span
        className={`challenge-status__badge challenge-status__badge--${variant}`}
      >
        {label}
      </span>
      <p className="challenge-status__context">
  {STATUS_CONTEXT[status]}
</p>
    </section>
  );
};

export default ChallengeStatusCard;