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
    ? "This commitment failed and the protected consequence has been released."
    : "Your consequence remains protected while you continue honoring this commitment.";

  return (
    <section className="consequence-card">
      <h2 className="consequence-card__title">
  Accountability Stakes
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
      <p className="consequence-card__context">
  Consequences exist to create accountability,
  not punishment.
</p>
    </section>
  );
};

export default ConsequenceStatusCard;