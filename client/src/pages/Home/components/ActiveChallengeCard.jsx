import challengeStatusLabels from "../../../constants/ChallengeStatusLabels";
 import { useNavigate } from "react-router-dom";
 
const ActiveChallengeCard = ({
  challenge,
}) => {


  const statusLabel =
    challengeStatusLabels[
      challenge.status
    ] || challenge.status;

   const navigate = useNavigate();

   const handleClick = () => {
  navigate(
    `/challenges/${challenge._id}`
  );
};

  return (
    <div onClick={handleClick}>
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
          challenge.deadlineAt
        ).toLocaleDateString()}
      </p>
    </div>
  );
};

export default ActiveChallengeCard;