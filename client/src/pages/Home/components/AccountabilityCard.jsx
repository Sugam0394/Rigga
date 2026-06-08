const AccountabilityCard = ({
  witnessName,
  witnessStatus,
}) => {
  return (
    <div>
      <h3>
        Accountability
      </h3>

      <p>
        Witness:
        {" "}
        {witnessName}
      </p>

      <p>
        Status:
        {" "}
        {witnessStatus}
      </p>
    </div>
  );
};

export default AccountabilityCard;