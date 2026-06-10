import ProgressReportCard
  from "./ProgressReportCard";

const ProgressReportList = ({
  reports,
  loading,
  error,
}) => {
  if (loading) {
    return (
      <p>
        Loading reports...
      </p>
    );
  }

  if (error) {
    return (
      <p>
        {error}
      </p>
    );
  }

  if (reports.length === 0) {
    return (
      <div>
        <h2>
          Progress Reports
        </h2>

        <p>
          No progress reports
          submitted yet.
        </p>

        <p>
          Be the first to
          submit proof.
        </p>
      </div>
    );
  }

  return (
    <div>
      <h2>
        Progress Reports
      </h2>

      {reports.map(
        (report) => (
          <ProgressReportCard
            key={report._id}
            report={report}
          />
        )
      )}
    </div>
  );
};

export default
  ProgressReportList;