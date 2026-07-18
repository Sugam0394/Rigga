 import "./AccountabilityCard.css";

const AccountabilityCard = ({
  witnessName,
  witnessStatus,
}) => {

  return (

    <section className="accountability-card">

      <p className="accountability-card__eyebrow">
        Accountability
      </p>

      <h3 className="accountability-card__title">
        Witness Verification
      </h3>

      <div className="accountability-card__content">

        <div className="accountability-card__row">

          <span className="accountability-card__label">
            Witness
          </span>

          <span className="accountability-card__value">
            {witnessName}
          </span>

        </div>

        <div className="accountability-card__row">

          <span className="accountability-card__label">
            Status
          </span>

          <span className="accountability-card__status">
            {witnessStatus}
          </span>

        </div>

      </div>

    </section>

  );

};

export default AccountabilityCard;