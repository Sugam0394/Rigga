 import { useNavigate } from "react-router-dom";

import "./HistoryChallengeCard.css";

import challengeStatusLabels
  from "../../../constants/ChallengeStatusLabels";

const formatDate = (value) => {

  if (!value) {
    return "—";
  }

  return new Date(value)
    .toLocaleDateString();

};

const HistoryChallengeCard = ({
  history,
}) => {

  const navigate =
    useNavigate();

  return (
    <article
      className="history-card"
      onClick={() =>
        navigate(
          `/challenges/${history.id}`
        )
      }
    >

      <div className="history-card__header">

        <h3 className="history-card__title">
          {history.title}
        </h3>

         <span className="history-card__status">
  {
    challengeStatusLabels[
      history.status
    ] ?? history.status
  }
</span>

      </div>

      <div className="history-card__body">

        <p>
          <strong>
            Completed:
          </strong>{" "}
          {formatDate(
            history.completedAt
          )}
        </p>

        <p>
          <strong>
            Deadline:
          </strong>{" "}
          {formatDate(
            history.deadlineAt
          )}
        </p>

        <p>
          <strong>
            Duration:
          </strong>{" "}
          {history.durationDays != null
            ? `${history.durationDays} day${
                history.durationDays === 1
                  ? ""
                  : "s"
              }`
            : "—"}
        </p>

        <p>
          <strong>
            Witness:
          </strong>{" "}
          {history.witnessDecision ??
            "Pending"}
        </p>

      </div>

    </article>
  );

};

export default
  HistoryChallengeCard;