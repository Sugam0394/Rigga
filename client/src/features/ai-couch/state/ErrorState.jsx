const AICoachErrorState = ({
  error,
}) => {

  return (
    <section className="ai-coach-card">

      <h2>
        AI Accountability Coach
      </h2>

      <p>
        {error}
      </p>

    </section>
  );
};

export default
  AICoachErrorState;