const AICoachCard = ({
  coach,
}) => {

  return (
    <section className="ai-coach-card">

      <div className="ai-coach-card__header">
        <h2>
          AI Accountability Coach
        </h2>

        <span>
          Priority:
          {" "}
          {coach.priority}
        </span>
      </div>

      <div className="ai-coach-card__content">

        <p>
          <strong>
            Consistency Coach:
          </strong>
          {" "}
          {
            coach
              .consistencyCoach
              .recommendation
          }
        </p>

        <p>
          <strong>
            Witness Coach:
          </strong>
          {" "}
          {
            coach
              .witnessCoach
              .recommendation
          }
        </p>

        <p>
          <strong>
            Progress Coach:
          </strong>
          {" "}
          {
            coach
              .progressCoach
              .recommendation
          }
        </p>

        <p>
          <strong>
            Review Coach:
          </strong>
          {" "}
          {
            coach
              .reviewCoach
              .recommendation
          }
        </p>

        <p>
          <strong>
            Appeal Coach:
          </strong>
          {" "}
          {
            coach
              .appealCoach
              .recommendation
          }
        </p>

      </div>

      <div className="ai-coach-card__footer">

        <small>
          Generated:
          {" "}
          {
            new Date(
              coach.generatedAt
            ).toLocaleString()
          }
        </small>

      </div>

    </section>
  );
};

export default
  AICoachCard;