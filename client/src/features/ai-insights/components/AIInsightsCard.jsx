import "./AIInsightsCard.css";

const AIInsightsCard = ({
  insights,
}) => {

  return (
    <section className="ai-insights-card">

      <div className="ai-insights-card__header">
        <h2>
          Accountability Insights
        </h2>

        <p>
          AI-powered accountability analysis
        </p>
      </div>

      <div className="ai-insights-card__grid">

        <div className="ai-insights-card__item">
          <span>
            Consistency
          </span>

          <strong>
            {
              insights.consistency
                ?.value
            }
          </strong>
        </div>

        <div className="ai-insights-card__item">
          <span>
            Witness Engagement
          </span>

          <strong>
            {
              insights.witnessEngagement
                ?.value
            }
          </strong>
        </div>

        <div className="ai-insights-card__item">
          <span>
            Challenge Health
          </span>

          <strong>
            {
              insights.challengeHealth
                ?.value
            }
          </strong>
        </div>

      </div>

      <div className="ai-insights-card__summary">

        <h3>
          Accountability Summary
        </h3>

        <p>
          {
            insights.summary
              ?.value
          }
        </p>

      </div>

    </section>
  );
};

export default AIInsightsCard;