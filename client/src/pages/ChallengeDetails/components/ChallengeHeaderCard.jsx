 import "./ChallengeHeaderCard.css";
import { getDeadlineStatus } from "../utils/deadLineStatus";

const ChallengeHeaderCard = ({
  title,
  deadlineAt,
  status,
}) => {
  const formattedDeadline = deadlineAt
    ? new Date(deadlineAt).toLocaleString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
        hour: "numeric",
        minute: "2-digit",
      })
    : "N/A";

  const deadlineStatus =
    deadlineAt && status === "ACTIVE"
      ? getDeadlineStatus(deadlineAt)
      : null;

  return (
    <section className="challenge-header">
      <p className="challenge-header__eyebrow">
        Commitment
      </p>

      <h1 className="challenge-header__title">
        {title}
      </h1>

      <div className="challenge-header__meta">
        <p className="challenge-header__deadline">
          📅 {formattedDeadline}
        </p>

        {deadlineStatus && (
          <p
            className={`challenge-header__remaining challenge-header__remaining--${deadlineStatus.variant}`}
          >
            {deadlineStatus.variant === "safe" && "🟢 "}
            {deadlineStatus.variant === "warning" && "🟡 "}
            {deadlineStatus.variant === "critical" && "🔴 "}
            {deadlineStatus.variant === "neutral" && "⚫ "}

            {deadlineStatus.text}
          </p>
        )}
      </div>

      <p className="challenge-header__context">
        This commitment is being tracked and verified through Rigga.
      </p>
    </section>
  );
};

export default ChallengeHeaderCard;