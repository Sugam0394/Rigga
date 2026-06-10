 const ConsequenceStatusCard = ({
  consequence,
}) => {
  const status =
    consequence?.isReleased
      ? "Released"
      : "Locked";

  return (
    <section>
      <h2>
        Consequence
      </h2>

      <p>
        Status: {status}
      </p>
    </section>
  );
};

export default ConsequenceStatusCard;