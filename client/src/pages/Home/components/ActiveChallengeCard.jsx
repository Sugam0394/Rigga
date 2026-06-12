import challengeStatusLabels from "../../../constants/ChallengeStatusLabels";
 import { useNavigate } from "react-router-dom";
 import "./ActiveChallengeCard.css";
 
const ActiveChallengeCard = ({
  challenge,
}) => {


  const statusLabel =
    challengeStatusLabels[
      challenge.status
    ] || challenge.status;

   const navigate = useNavigate();

   const badgeClassMap = {
  ACTIVE:
    "active-challenge-card__badge--active",

  UNDER_REVIEW:
    "active-challenge-card__badge--review",

  REJECTED:
    "active-challenge-card__badge--rejected",

  APPEALED:
    "active-challenge-card__badge--appealed",

  FAILED:
    "active-challenge-card__badge--failed",

  COMPLETED:
    "active-challenge-card__badge--completed",
};
const deadlineDate = new Date(
    challenge.deadlineAt
  );

const today =
  new Date();

const remainingDays =
  Math.ceil(
    (
      deadlineDate -
      today
    ) /
      (
        1000 *
        60 *
        60 *
        24
      )
  );

const remainingLabel =
  remainingDays > 0
    ? `${remainingDays} Days Remaining`
    : "Deadline Passed";


   const handleClick = () => {
  navigate(
    `/challenges/${challenge._id}`
  );
};

 return (
  <div
    className="active-challenge-card"
    onClick={handleClick}
  >
    <h2 className="active-challenge-card__title">
      {challenge.title}
    </h2>

    <span
       className={`active-challenge-card__badge ${
  badgeClassMap[
    challenge.status
  ] || ""
}`}
    >
      {statusLabel}
    </span>

 <p className="active-challenge-card__deadline">
  Deadline:
  {" "}
  {deadlineDate.toLocaleDateString(
    "en-US",
    {
      day: "numeric",
      month: "short",
      year: "numeric",
    }
  )}
</p>

<p className="active-challenge-card__remaining">
  {remainingLabel}
</p>
<div className="active-challenge-card__footer">
  <p className="active-challenge-card__witness">
    Witness:
    {" "}
    {challenge.witness?.name ||
      "Not Assigned"}
  </p>
</div>
  </div>
);
};

export default ActiveChallengeCard;