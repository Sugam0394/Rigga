 import { useNavigate } from "react-router-dom";

import "./ActiveChallengeCard.css";

const ActiveChallengeCard = ({
  challenge,
}) => {

  const navigate =
    useNavigate();

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

  const remainingClass = `
    active-challenge-card__remaining
    ${
      challenge.remaining?.variant ===
      "danger"
        ? "active-challenge-card__remaining--danger"
        : challenge.remaining?.variant ===
          "urgent"
        ? "active-challenge-card__remaining--urgent"
        : ""
    }
  `;

  const handleClick = () => {

    if (!challenge?.id) {
      return;
    }

    navigate(
      `/challenges/${challenge.id}`
    );

  };

  return (

    <div
      className="active-challenge-card"
      onClick={handleClick}
    >

     <span
  className={`active-challenge-card__badge ${
    badgeClassMap[
      challenge.status?.id
    ] || ""
  }`}
>
  {challenge.status?.label}
</span>

...

<p className="active-challenge-card__witness">
  {challenge.trustState?.label}
</p>

      <h2 className="active-challenge-card__title">
        {challenge.title ||
          "Untitled Commitment"}
      </h2>

      <p className="active-challenge-card__deadline">
        Deadline:{" "}
        {challenge.deadlineLabel}
      </p>

      <p
        className={
          remainingClass
        }
      >
        {
          challenge.remaining
            ?.label
        }
      </p>

      <div className="active-challenge-card__footer">

        <p className="active-challenge-card__witness">
          {
            challenge.witnessLabel
          }
        </p>

      </div>

    </div>

  );

};

export default ActiveChallengeCard;