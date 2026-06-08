import challengeStatusLabels from "../../../constants/ChallengeStatusLabels";

const ActiveChallengeCard = ({
  challenge,
}) => {
  const statusLabel =
    challengeStatusLabels[
      challenge.status
    ] || challenge.status;

  return (
    <div>
      <h2>
        {challenge.title}
      </h2>

      <p>
        Status: {statusLabel}
      </p>

      <p>
        Deadline:
        {" "}
        {new Date(
          challenge.deadline
        ).toLocaleDateString()}
      </p>
    </div>
  );
};

export default ActiveChallengeCard;