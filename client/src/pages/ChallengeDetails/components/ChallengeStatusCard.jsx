const STATUS_LABELS = {
  ACTIVE: "In Progress",
  UNDER_REVIEW: "Under Review",
  REJECTED: "Awaiting Your Response",
  APPEALED: "Under Final Review",
  FAILED: "Challenge Failed",
  COMPLETED: "Completed",
};

const ChallengeStatusCard = ({
  status,
}) => {
  const label =
    STATUS_LABELS[status] ||
    "Unknown Status";

  return (
    <section>
      <h2>
        Current Status
      </h2>

      <p>{label}</p>
    </section>
  );
};

export default ChallengeStatusCard;