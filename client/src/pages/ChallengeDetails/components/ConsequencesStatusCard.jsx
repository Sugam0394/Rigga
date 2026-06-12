 import "./ConsequenceStatusCard.css";

const ConsequenceStatusCard = ({
  consequence,
}) => {
  const isReleased =
    consequence?.isReleased;

  const status =
    isReleased
      ? "Released"
      : "Locked";

  const message =
    isReleased
      ? "Your consequence has been released."
      : "Your consequence remains protected while this commitment is active.";

  return (
    <section className="consequence-card">
      <h2 className="consequence-card__title">
        Consequence Status
      </h2>

      <span
        className={`consequence-card__badge consequence-card__badge--${
          isReleased
            ? "released"
            : "locked"
        }`}
      >
        {status}
      </span>

      <p className="consequence-card__message">
        {message}
      </p>
    </section>
  );
};

export default ConsequenceStatusCard;