import "./AINarrativeCard.css";

const AINarrativeCard = ({
  narrative,
}) => {

  return (
    <section className="ai-narrative-card">

      <div className="ai-narrative-card__header">
        <h2>
          Accountability Narrative
        </h2>

        <p>
          Accountability explained through narrative analysis
        </p>
      </div>

      <div className="ai-narrative-card__master">

        <h3>
          Accountability Story
        </h3>

        <p>
          {
            narrative
              .masterNarrative
              ?.value
          }
        </p>

      </div>

      <div className="ai-narrative-card__section">

        <h4>
          Progress Narrative
        </h4>

        <p>
          {
            narrative
              .progressNarrative
              ?.value
          }
        </p>

      </div>

      <div className="ai-narrative-card__section">

        <h4>
          Witness Narrative
        </h4>

        <p>
          {
            narrative
              .witnessNarrative
              ?.value
          }
        </p>

      </div>

      <div className="ai-narrative-card__section">

        <h4>
          Accountability Narrative
        </h4>

        <p>
          {
            narrative
              .accountabilityNarrative
              ?.value
          }
        </p>

      </div>

      <div className="ai-narrative-card__section">

        <h4>
          Outcome Narrative
        </h4>

        <p>
          {
            narrative
              .outcomeNarrative
              ?.value
          }
        </p>

      </div>

      <div className="ai-narrative-card__footer">

        <small>
          Generated:
          {" "}
          {
            new Date(
              narrative.generatedAt
            ).toLocaleString()
          }
        </small>

      </div>

    </section>
  );
};

export default AINarrativeCard;