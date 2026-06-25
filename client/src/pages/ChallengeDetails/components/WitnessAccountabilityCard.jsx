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
    witness?.decision || "PENDING";

  const label =
  DECISION_LABELS[decision] ||
  "Unknown";

  const variant =
    decision.toLowerCase();

  return (
    <section className="witness-card">
     <h2 className="witness-card__title">
  Witness Verification
</h2>

       <p className="witness-card__reviewer">
  {witness?.name || "No Witness Assigned"}
</p>

   <p className="witness-card__label">
  Current Verification Stage
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