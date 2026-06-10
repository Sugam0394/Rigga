const ChallengeHeaderCard = ({
  title,
  deadline,
  status,
}) => {
  return (
    <section>
      <h1>{title}</h1>

      <p>
        Deadline:
        {" "}
        {deadline
          ? new Date(
              deadline
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