 import "./NextActionCard.css";

const NextActionCard = ({
  eyebrow,
  icon,
  tone = "neutral",
  title,
  description,
  statusLabel,
  children,
}) => {

  return (

    <section
      className={`
        next-action-card
        next-action-card--${tone}
      `}
    >

      {/* Header */}

      <header className="next-action-card__header">

        <p className="next-action-card__eyebrow">

          {eyebrow}

        </p>

      </header>

      {/* Hero */}

      <div className="next-action-card__hero">

        <div className="next-action-card__icon">

          {icon}

        </div>

        <div className="next-action-card__content">

          <h2 className="next-action-card__title">

            {title}

          </h2>

          <p className="next-action-card__description">

            {description}

          </p>

        </div>

      </div>

      {/* Status */}

      {statusLabel ? (

        <div className="next-action-card__status">

          <span className="next-action-card__status-dot" />

          <span className="next-action-card__status-label">

            {statusLabel}

          </span>

        </div>

      ) : null}

      {/* CTA */}

      {children ? (

        <div className="next-action-card__actions">

          {children}

        </div>

      ) : null}

    </section>

  );

};

export default NextActionCard;