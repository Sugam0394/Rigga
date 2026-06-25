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
         Loading evidence timeline...
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
       Evidence Timeline

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
          key={report._id}
          report={report}
        />
      ))}
    </section>
  );
};

export default ProgressReportList;