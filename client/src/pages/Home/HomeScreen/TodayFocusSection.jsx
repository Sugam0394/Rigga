 

import "./TodayFocusSection.css";

const TodayFocusSection = ({
  immediateAction,
}) => {

  if (
    !immediateAction ||
    !immediateAction.title ||
    !immediateAction.action
  ) {
    return null;
  }

 return (

  <section className="today-focus-section">

    <header className="today-focus-section__header">

      <p className="today-focus-section__eyebrow">
        TODAY'S PRIORITY
      </p>

      <h2 className="today-focus-section__title">
        Immediate Action
      </h2>

    </header>

    <div className="today-focus-section__item">

      <div className="today-focus-section__indicator">
        !
      </div>

      <div className="today-focus-section__content">

        <p className="today-focus-section__action">
          {immediateAction.attentionState?.label}
        </p>

        <h3 className="today-focus-section__challenge">
          {immediateAction.title}
        </h3>

        <p className="today-focus-section__hint">
          Complete this first before moving to anything else.
        </p>

      </div>

    </div>

  </section>

);

};

export default TodayFocusSection;