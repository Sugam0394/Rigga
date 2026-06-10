const ProgressSummaryCard = ({
  progress,
}) => {
  return (
    <section>
      <h2>
        Progress
      </h2>

      <p>
        Reports Submitted:
        {" "}
        {progress.totalReports}
      </p>

      {progress.latestReportDate ? (
        <p>
          Latest Report:
          {" "}
          {new Date(
            progress.latestReportDate
          ).toLocaleDateString()}
        </p>
      ) : (
        <p>
          No progress reports
          submitted yet.
        </p>
      )}
    </section>
  );
};

export default ProgressSummaryCard;