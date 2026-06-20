 import "./WelcomeSection.css";

const WelcomeSection = ({
  commitmentCount,
}) => {
  const hour =
    new Date().getHours();

  const greeting =
    hour < 12
      ? "Good Morning"
      : hour < 18
      ? "Good Afternoon"
      : "Good Evening";

  return (
    <section className="welcome-section">
      <h2 className="welcome-section__title">
        {greeting}
      </h2>

      <p className="welcome-section__commitments">
        You have{" "}
        {commitmentCount} active
        commitments.
      </p>

      <p className="welcome-section__message">
        Keep building credibility.
      </p>
    </section>
  );
};

export default WelcomeSection;

 