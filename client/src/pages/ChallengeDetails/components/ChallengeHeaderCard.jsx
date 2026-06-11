const ChallengeHeaderCard = ({
  title,
  deadlineAt,
  status,
}) => {
  return (
    <section>
      <h1>{title}</h1>

      <p>
        Deadline:
        {" "}
        {deadlineAt
          ? new Date(
              deadlineAt
            ).toLocaleDateString()
          : "N/A"}
      </p>

      <p>
        Status:
        {" "}
        {status}
      </p>
    </section>
  );
};

export default ChallengeHeaderCard;