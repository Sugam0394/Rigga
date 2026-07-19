    import { useNavigate } from "react-router-dom";

import "./RecentResultCard.css";

const RecentResultCard = ({
  result,
}) => {

  const navigate =
    useNavigate();

  if (!result) {
    return null;
  }

  const badgeClassMap = {

    COMPLETED:
      "recent-result-card__badge--completed",

    FAILED:
      "recent-result-card__badge--failed",

  };

  const handleOpenMission = () => {

    if (!result?.id) {
      return;
    }

    navigate(
      `/challenges/${result.id}`
    );

  };

  return (

    <article
      className="recent-result-card"
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

      <div className="recent-result-card__top">

        <span
          className={`
            recent-result-card__badge
            ${
              badgeClassMap[
                result.status?.id
              ] || ""
            }
          `}
        >

          {result.status?.label}

        </span>

      </div>

      {/* Title */}

      <div className="recent-result-card__content">

        <h2 className="recent-result-card__title">

          {result.title ||
            "Untitled Commitment"}

        </h2>

      </div>

      {/* Divider */}

      <div
        className="recent-result-card__divider"
      />

      {/* Finished Date */}

      <section className="recent-result-card__section">

        <div className="recent-result-card__section-header">

          <span className="recent-result-card__icon">
            ✅
          </span>

          <span className="recent-result-card__label">
            Finished
          </span>

        </div>

        <p className="recent-result-card__value">

          {result.finishedLabel}

        </p>

      </section>

      {/* Witness */}

      <section className="recent-result-card__section">

        <div className="recent-result-card__section-header">

          <span className="recent-result-card__icon">
            🤝
          </span>

          <span className="recent-result-card__label">
            Verification
          </span>

        </div>

        <p className="recent-result-card__witness">

          {result.trustState?.label}

        </p>

      </section>

      {/* Footer */}

      <div className="recent-result-card__footer">

        <span className="recent-result-card__cta">

          View Details

        </span>

        <span className="recent-result-card__arrow">

          →

        </span>

      </div>

    </article>

  );

};

export default RecentResultCard;