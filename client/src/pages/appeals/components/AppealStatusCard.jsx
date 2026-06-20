 import "./AppealStatusCard.css";

const AppealStatusCard = () => {
  return (
    <section className="appeal-status">
  <h3 className="appeal-status__title">
    Appeal Under Review
  </h3>

  <p className="appeal-status__message">
    Your challenge was rejected and is currently
    undergoing a fairness review.
  </p>

  <p className="appeal-status__context">
    No action is required right now.
    Await the final outcome.
  </p>
</section>
  );
};

export default AppealStatusCard;