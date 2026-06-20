 import { Link } from "react-router-dom";
import "./EmptyStateCard.css";

const EmptyStateCard = () => {
  return (
    <div className="empty-state-card">
      <h2>
        Every commitment starts with a promise.
      </h2>

      <p className="empty-state-card__description">
        Turn your promise into a commitment,
        invite a witness,
        prove your progress,
        and build credibility through action.
      </p>

      <div className="empty-state-card__journey">
        <div className="empty-state-card__step">
          Promise
        </div>

        <div className="empty-state-card__arrow">
          →
        </div>

        <div className="empty-state-card__step">
          Commitment
        </div>

        <div className="empty-state-card__arrow">
          →
        </div>

        <div className="empty-state-card__step">
          Verification
        </div>

        <div className="empty-state-card__arrow">
          →
        </div>

        <div className="empty-state-card__step">
          Credibility
        </div>
      </div>

      <Link
        to="/challenges/create"
        className="empty-state-card__cta"
      >
        Create Commitment
      </Link>
    </div>
  );
};

export default EmptyStateCard;