 import challengeStatusLabels from "../../../constants/ChallengeStatusLabels";
import "./ChallengeStatusCard.css";

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
    </section>
  );
};

export default ChallengeStatusCard;