import "./ConsequenceProtectionBar.css";

const ConsequenceProtectionBar = ({
  isReleased = false,
}) => {
  const percentage =
    isReleased ? 100 : 100;

  const title =
    isReleased
      ? "Released"
      : "Protected";

  return (
    <section className="consequence-protection">

      <div className="consequence-protection__header">

        <div>

          <p className="consequence-protection__eyebrow">
            Protection
          </p>

          <h3 className="consequence-protection__title">
            {title}
          </h3>

        </div>

        <span
          className={`consequence-protection__status consequence-protection__status--${
            isReleased
              ? "released"
              : "protected"
          }`}
        >
          {isReleased
            ? "Released"
            : "Protected"}
        </span>

      </div>

      <div className="consequence-protection__track">

        <div
          className={`consequence-protection__fill consequence-protection__fill--${
            isReleased
              ? "released"
              : "protected"
          }`}
          style={{
            width: `${percentage}%`,
          }}
        />

      </div>

    </section>
  );
};

export default ConsequenceProtectionBar;