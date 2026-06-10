 const WitnessAccountabilityCard = ({
  witness,
}) => {
  return (
    <section>
      <h2>
        Witness Accountability
      </h2>

      <p>
        Witness:
        {" "}
        {witness?.name || "N/A"}
      </p>

      <p>
        Decision:
        {" "}
        {witness?.decision ||
          "Pending"}
      </p>
    </section>
  );
};

export default WitnessAccountabilityCard;