 import "./ChallengeHeaderCard.css";

const ChallengeHeaderCard = ({
  title,
  deadlineAt,
  status,
}) => {
  const formattedDeadline =
    deadlineAt
      ? new Date(deadlineAt).toLocaleString(
          "en-US",
          {
            month: "short",
            day: "numeric",
            year: "numeric",
            hour: "numeric",
            minute: "2-digit",
          }
        )
      : "N/A";

  let remainingText = null;

  if (deadlineAt && status === "ACTIVE") {
    const now = new Date();
    const deadline = new Date(deadlineAt);

    const diffTime =
      deadline.getTime() -
      now.getTime();

    const daysRemaining =
      Math.ceil(
        diffTime /
          (1000 * 60 * 60 * 24)
      );

    remainingText =
      daysRemaining > 0
        ? `${daysRemaining} Days Remaining`
        : "Deadline Reached";
  }

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
          Deadline: {formattedDeadline}
        </p>

       

        {remainingText && (
          <p className="challenge-header__remaining">
            {remainingText}
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