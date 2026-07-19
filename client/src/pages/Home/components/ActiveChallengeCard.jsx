 import { useNavigate } from "react-router-dom";

import "./ActiveChallengeCard.css";

const ActiveChallengeCard = ({
  challenge,
}) => {

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

  const remainingClass = `
    active-challenge-card__remaining
    ${
      challenge.remaining?.variant === "danger"
        ? "active-challenge-card__remaining--danger"
        : challenge.remaining?.variant === "urgent"
        ? "active-challenge-card__remaining--urgent"
        : ""
    }
  `;

  const remainingLabel =
    challenge.remaining?.days !== null &&
    challenge.remaining?.days > 0
      ? `${challenge.remaining.days} ${challenge.remaining.temporalState?.label}`
      : challenge.remaining?.temporalState?.label;

  const handleOpenMission = () => {

    if (!challenge?.id) {
      return;
    }

    navigate(
      `/challenges/${challenge.id}`
    );

  };

  return (

    <article
      className="active-challenge-card"
      role="button"
      tabIndex={0}
      onClick={handleOpenMission}
      onKeyDown={(event) => {

        if (
          event.key === "Enter" ||
          event.key === " "
        ) {
          event.preventDefault();
          handleOpenMission();
        }

      }}
    >

      {/* Top */}

      <div className="active-challenge-card__top">

        <span
          className={`
            active-challenge-card__badge
            ${
              badgeClassMap[
                challenge.status?.id
              ] || ""
            }
          `}
        >
          {challenge.status?.label}
        </span>

      </div>

      {/* Title */}

      <div className="active-challenge-card__content">

        <h2 className="active-challenge-card__title">

          {challenge.title ||
            "Untitled Commitment"}

        </h2>

      </div>

      {/* Divider */}

      <div
        className="active-challenge-card__divider"
      />

      {/* Deadline */}

      <section className="active-challenge-card__section">

        <div className="active-challenge-card__section-header">

          <span className="active-challenge-card__icon">
            📅
          </span>

          <span className="active-challenge-card__label">
            Deadline
          </span>

        </div>

        <p className="active-challenge-card__value">

          {challenge.deadlineLabel}

        </p>

      </section>

      {/* Remaining */}

      <section className="active-challenge-card__section">

        <div className="active-challenge-card__section-header">

          <span className="active-challenge-card__icon">
            ⏳
          </span>

          <span className="active-challenge-card__label">
            Remaining
          </span>

        </div>

        <p className={remainingClass}>

          {remainingLabel}

        </p>

      </section>

      {/* Witness */}

      <section className="active-challenge-card__section">

        <div className="active-challenge-card__section-header">

          <span className="active-challenge-card__icon">
            🤝
          </span>

          <span className="active-challenge-card__label">
            Witness
          </span>

        </div>

        <p className="active-challenge-card__witness">

          {challenge.trustState?.label}

        </p>

      </section>

      {/* Footer */}

      <div className="active-challenge-card__footer">

        <span className="active-challenge-card__cta">

          View Mission

        </span>

        <span className="active-challenge-card__arrow">

          →

        </span>

      </div>

    </article>

  );

};

export default ActiveChallengeCard;