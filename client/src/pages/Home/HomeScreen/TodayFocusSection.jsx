 import "./TodayFocusSection.css";

const TodayFocusSection = ({
  focusItems,
}) => {
  if (
    !focusItems ||
    focusItems.length === 0
  ) {
    return null;
  }

  return (
    <section className="today-focus-section">
      <h2 className="today-focus-section__title">
        Today's Focus
      </h2>

      <div className="today-focus-section__list">
        {focusItems.map(
          (
            item,
            index
          ) => (
            <div
              key={index}
              className="today-focus-section__item"
            >
              <div className="today-focus-section__indicator">
                !
              </div>

              <div>
                <p className="today-focus-section__action">
                  {item.action}
                </p>

                <p className="today-focus-section__challenge">
                  {item.title}
                </p>
              </div>
            </div>
          )
        )}
      </div>
    </section>
  );
};

export default TodayFocusSection;