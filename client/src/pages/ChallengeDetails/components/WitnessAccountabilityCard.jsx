 import "./WitnessAccountabilityCard.css";

const DECISION_LABELS = {
  APPROVED: "Approved",
  REJECTED: "Rejected",
  APPEALED: "Appealed",
};

const WitnessAccountabilityCard = ({
  witness,
}) => {
  const decision =
    witness?.decision || "PENDING";

  const label =
    DECISION_LABELS[decision] ||
    "Pending Review";

  const variant =
    decision.toLowerCase();

  return (
    <section className="witness-card">
      <h2 className="witness-card__title">
        Witness
      </h2>

      <p className="witness-card__name">
        {witness?.name || "No Witness Assigned"}
      </p>

      <p className="witness-card__label">
        Review Status
      </p>

      <span
        className={`witness-card__badge witness-card__badge--${variant}`}
      >
        {label}
      </span>
    </section>
  );
};

export default WitnessAccountabilityCard;