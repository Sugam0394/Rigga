 import "./AppealStatusCard.css";

const AppealStatusCard = () => {
  return (
    <section className="appeal-status">
  <h3 className="appeal-status__title">
     Appeal Status
  </h3>

  <p className="appeal-status__message">
  Your appeal has been submitted and is currently under review.
  </p>

  <p className="appeal-status__context">
   No further action is required at this stage.
Rigga will notify you once a final decision has been reached.
  </p>
</section>
  );
};

export default AppealStatusCard;