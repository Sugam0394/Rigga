 import "./WitnessAccountabilityCard.css";

const DECISION_LABELS = {
  PENDING: "Awaiting Review",
  APPROVED: "Approved",
  REJECTED: "Rejected",
  APPEALED: "Appealed",
};

const WitnessAccountabilityCard = ({
  witness,
}) => {
  const decision =
    witness?.decision ?? "PENDING";

  const label =
    DECISION_LABELS[decision] ??
    "Unknown";

  const variant =
    decision.toLowerCase();

  return (
    <section className="witness-card">

      <h2 className="witness-card__title">
        Witness Verification
      </h2>

      <div className="witness-card__content">

        <div className="witness-card__row">
          <span className="witness-card__label">
            Witness
          </span>

          <p className="witness-card__value">
            {witness?.name ||
              "No Witness Assigned"}
          </p>
        </div>

        <div className="witness-card__row">
          <span className="witness-card__label">
            Phone
          </span>

          <p className="witness-card__value">
            {witness?.phone ||
              "Not Available"}
          </p>
        </div>

        <div className="witness-card__row">
          <span className="witness-card__label">
            Review Status
          </span>

          <span
            className={`witness-card__badge witness-card__badge--${variant}`}
          >
            {label}
          </span>
        </div>

      </div>

    </section>
  );
};

export default WitnessAccountabilityCard;