 import "./ProgressReportList.css";
import ProgressReportCard from "./ProgressReportCard";

const ProgressReportList = ({
  reports,
  loading,
  error,
}) => {
  if (loading) {
    return (
      <div className="progress-timeline__loading">
        Loading challenge history...
      </div>
    );
  }

  if (error) {
    return (
      <div className="progress-timeline__error">
        {error}
      </div>
    );
  }

  if (reports.length === 0) {
    return (
      <div className="progress-timeline__empty">
        <h2>Challenge History</h2>

        <p>
          No progress reports submitted yet.
        </p>

        <p>
          Submit your first update to begin
          building your accountability history.
        </p>
      </div>
    );
  }

  return (
    <section className="progress-timeline">
      <h2 className="progress-timeline__title">
        Challenge History
      </h2>

      {reports.map((report) => (
        <ProgressReportCard
          key={report._id}
          report={report}
        />
      ))}
    </section>
  );
};

export default ProgressReportList;