 import "./ProgressSummaryCard.css";

const ProgressSummaryCard = ({
  progress,
}) => {
  return (
    <section className="progress-summary-card">
      <h2 className="progress-summary-card__title">
        Progress
      </h2>

      <p className="progress-summary-card__count">
        {progress.totalReports}
      </p>

      <p className="progress-summary-card__label">
        Reports Submitted
      </p>

      <div className="progress-summary-card__latest">
        {progress.latestReportDate ? (
          <p>
            Latest Report:{" "}
            {new Date(
              progress.latestReportDate
            ).toLocaleDateString()}
          </p>
        ) : (
          <p>
            No progress reports submitted yet.
          </p>
        )}
      </div>
    </section>
  );
};

export default ProgressSummaryCard;