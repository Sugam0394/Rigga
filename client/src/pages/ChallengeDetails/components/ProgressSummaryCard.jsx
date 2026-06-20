 import "./ProgressSummaryCard.css";

const ProgressSummaryCard = ({
  progress,
}) => {
  return (
    <section className="progress-summary-card">
     <h2 className="progress-summary-card__title">
  Evidence Summary
</h2>

      <p className="progress-summary-card__count">
        {progress.totalReports}
      </p>

      <p className="progress-summary-card__label">
        Reports Submitted
      </p>

       <div className="progress-summary-card__latest">
  {progress.latestReportDate ? (
    <>
      <p>
        Latest Evidence Submitted
      </p>

      <p>
        {new Date(
          progress.latestReportDate
        ).toLocaleDateString()}
      </p>
    </>
  ) : (
    <p>
      No evidence submitted yet.
    </p>
  )}
</div>
    </section>
  );
};

export default ProgressSummaryCard;