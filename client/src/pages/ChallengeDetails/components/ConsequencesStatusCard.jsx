 import "./ConsequenceStatusCard.css";
import ConsequenceProtectionBar from "./ConsequenceProtectionBar";


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
      ? "Your commitment was not successfully verified. The protected consequence has now been released."
      : "Your consequence remains protected while this commitment is still in progress.";

  return (
    <section className="consequence-card">

      <h2 className="consequence-card__title">
        Consequence Status
      </h2>

      <ConsequenceProtectionBar
  isReleased={isReleased}
/>

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
        Consequences reinforce accountability—not punishment.
      </p>

    </section>
  );
};

export default ConsequenceStatusCard;