 import "./TodayFocusSection.css";

const TodayFocusSection = ({
  immediateAction,
}) => {

  if (!immediateAction) {
    return null;
  }

  return (
    <section className="today-focus-section">

      <h2 className="today-focus-section__title">
        Immediate Action
      </h2>

      <div className="today-focus-section__item">

        <div className="today-focus-section__indicator">
          !
        </div>

        <div className="today-focus-section__content">

          <p className="today-focus-section__action">
            {immediateAction.action}
          </p>

          <p className="today-focus-section__challenge">
            {immediateAction.title}
          </p>

        </div>

      </div>

    </section>
  );
};

export default TodayFocusSection;