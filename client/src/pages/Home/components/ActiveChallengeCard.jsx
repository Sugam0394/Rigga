 import challengeStatusLabels from "../../../constants/ChallengeStatusLabels";
import { useNavigate } from "react-router-dom";

import "./ActiveChallengeCard.css";

import {
  getNextAction,
  getUrgencyContext,
} from "../utils/rity";

const ActiveChallengeCard = ({
  challenge,
}) => {
  const navigate =
    useNavigate();

  const statusLabel =
    challengeStatusLabels[
      challenge.status
    ] || challenge.status;

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

  const deadlineDate =
    new Date(
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

  let remainingLabel =
    `${remainingDays} Days Remaining`;

  let remainingClass =
    "active-challenge-card__remaining";

  if (
    remainingDays <= 0
  ) {
    remainingLabel =
      "Deadline Passed";

    remainingClass +=
      " active-challenge-card__remaining--danger";
  } else if (
    remainingDays <= 2
  ) {
    remainingClass +=
      " active-challenge-card__remaining--urgent";
  }

  const nextAction =
    getNextAction(
      challenge
    );

  const urgencyContext =
    getUrgencyContext(
      challenge.deadlineAt
    );

  const handleClick =
    () => {
      navigate(
        `/challenges/${challenge._id}`
      );
    };

  return (
    <div
      className="active-challenge-card"
      onClick={
        handleClick
      }
    >
      {/* STATUS FIRST */}
      <span
        className={`active-challenge-card__badge ${
          badgeClassMap[
            challenge.status
          ] || ""
        }`}
      >
        {statusLabel}
      </span>

      {/* TITLE */}
      <h2 className="active-challenge-card__title">
        {challenge.title}
      </h2>

      {/* NEXT ACTION */}
      <div className="active-challenge-card__next-action">
        <p className="active-challenge-card__next-action-label">
          Next Action
        </p>

        <p className="active-challenge-card__next-action-value">
          {nextAction}
        </p>
      </div>

      {/* DEADLINE */}
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

      <p
        className={
          remainingClass
        }
      >
        {remainingLabel}
      </p>

      {/* WITNESS */}
      <div className="active-challenge-card__footer">
        <p className="active-challenge-card__witness">
          Witness:
          {" "}
          {challenge
            .witness?.name ||
            "Not Assigned"}
        </p>
      </div>

      {/* CONTEXT */}
      <p className="active-challenge-card__context">
        {
          urgencyContext
        }
      </p>
    </div>
  );
};

export default ActiveChallengeCard;