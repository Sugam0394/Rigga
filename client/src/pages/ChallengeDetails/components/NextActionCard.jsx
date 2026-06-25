 import "./NextActionCard.css";

const NextActionCard = ({
  title,
  description,
  children,
}) => {
  return (
    <section className="next-action-card">
      <p className="next-action-card__eyebrow">
        Immediate Next Step
      </p>

      <h2 className="next-action-card__title">
        {title}
      </h2>

      <p className="next-action-card__description">
        {description}
      </p>

    {children ? (
  <div className="next-action-card__actions">
    {children}
  </div>
) : null}
    </section>
  );
};

export default NextActionCard;