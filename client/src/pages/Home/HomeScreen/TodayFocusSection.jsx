import "./TodayFocusSection.css";

const TodayFocusSection = () => {
  return (
    <section className="today-focus-section">
      <h2 className="today-focus-section__title">
        Today's Focus
      </h2>

      <div className="today-focus-section__list">
        <div className="today-focus-section__item">
          <span className="today-focus-section__count">
            1
          </span>

          <span className="today-focus-section__label">
            Progress Report Due
          </span>
        </div>

        <div className="today-focus-section__item">
          <span className="today-focus-section__count">
            1
          </span>

          <span className="today-focus-section__label">
            Witness Review Pending
          </span>
        </div>

        <div className="today-focus-section__item">
          <span className="today-focus-section__count">
            1
          </span>

          <span className="today-focus-section__label">
            Deadline This Week
          </span>
        </div>
      </div>
    </section>
  );
};

export default TodayFocusSection;