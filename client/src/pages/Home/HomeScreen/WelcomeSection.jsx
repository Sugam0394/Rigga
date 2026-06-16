import "./WelcomeSection.css";

 

const WelcomeSection = ({
  commitmentCount,
}) => {
  return (
    <section className="welcome-section">
      <h2 className="welcome-section__title">
        Good Morning
      </h2>

      <p className="welcome-section__commitments">
        You have {commitmentCount}
        active commitments.
      </p>

      <p className="welcome-section__message">
        Keep building credibility.
      </p>
    </section>
  );
};

export default WelcomeSection;

 