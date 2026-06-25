 import "./ProgressSummaryCard.css";

const ProgressSummaryCard = ({
  progress,
}) => {
  return (
    <section className="progress-summary-card">
     <h2 className="progress-summary-card__title">
   Progress & Evidence
</h2>

      <p className="progress-summary-card__count">
        {progress.totalReports}
      </p>

      <p className="progress-summary-card__label">
         Evidence Submitted
      </p>

       <div className="progress-summary-card__latest">
  {progress.latestReportDate ? (
    <>
      <p>
         Latest Submission
      </p>

      <p>
        {new Date(
          progress.latestReportDate
        ).toLocaleDateString()}
      </p>
    </>
  ) : (
    <p>
      No evidence has been submitted for this commitment yet.
    </p>
  )}
</div>
    </section>
  );
};

export default ProgressSummaryCard;