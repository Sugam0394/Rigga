 import "./ProgressReportList.css";
import ProgressReportCard from "./ProgressReportCard";

const ProgressReportList = ({
  reports = [],
}) => {

  if (reports.length === 0) {
    return (
      <div className="progress-timeline__empty">
        <h2>Evidence Timeline</h2>

        <p>
          No evidence has been submitted yet.
        </p>

        <p>
          Every evidence submission becomes part of your accountability record.
        </p>
      </div>
    );
  }

  return (
    <section className="progress-timeline">

      <h2 className="progress-timeline__title">
        Evidence Timeline
      </h2>

      <p className="progress-timeline__subtitle">
        Review every piece of evidence submitted throughout this commitment.
      </p>

      {reports.map((report) => (
        <ProgressReportCard
          key={report.metadata.reportId}
          report={report}
        />
      ))}

    </section>
  );
};

export default ProgressReportList;