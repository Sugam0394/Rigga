 import { Link } from "react-router-dom";

import VisualStateDictionary
  from "../../../constants/VisualsStateDictionary.js";

import "./EmptyStateCard.css";

const EmptyStateCard = () => {

  const {
    title,
    description,
    journey,
    action,
  } =
    VisualStateDictionary
      .runtime
      .emptyState;

  return (

    <div className="empty-state-card">

      <h2>
        {title}
      </h2>

      <p className="empty-state-card__description">
        {description}
      </p>

      <div className="empty-state-card__journey">

        <div className="empty-state-card__step">
          {journey.promise}
        </div>

        <div className="empty-state-card__arrow">
          →
        </div>

        <div className="empty-state-card__step">
          {journey.commitment}
        </div>

        <div className="empty-state-card__arrow">
          →
        </div>

        <div className="empty-state-card__step">
          {journey.verification}
        </div>

        <div className="empty-state-card__arrow">
          →
        </div>

        <div className="empty-state-card__step">
          {journey.credibility}
        </div>

      </div>

      <Link
        to="/challenges/create"
        className="empty-state-card__cta"
      >
        {action}
      </Link>

    </div>

  );

};

export default EmptyStateCard;