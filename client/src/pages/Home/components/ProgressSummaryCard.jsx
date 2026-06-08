const ProgressSummaryCard = ({
  submittedReports = 0,
  totalReports = 0,
}) => {
  return (
    <div>
      <h3>
        Progress Summary
      </h3>

      <p>
        {submittedReports} /{" "}
        {totalReports} Reports
        Submitted
      </p>
    </div>
  );
};

export default ProgressSummaryCard;