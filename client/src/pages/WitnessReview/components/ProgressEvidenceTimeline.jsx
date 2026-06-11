const ProgressEvidenceTimeline = ({
  reports = [],
}) => {

  if (!reports.length) {
    return (
      <div>
        <h3>
          Progress Evidence
        </h3>

        <p>
          No progress reports submitted.
        </p>
      </div>
    );
  }

  return (
    <div>
      <h3>
        Progress Evidence
      </h3>

      {reports.map((report) => (
        <div key={report._id}>
          <p>
            <strong>Date:</strong>
            {" "}
            {new Date(
              report.createdAt
            ).toLocaleDateString()}
          </p>

          <p>
            <strong>Notes:</strong>
            {" "}
            {report.notes}
          </p>

          {report.imageUrl && (
            <img
              src={report.imageUrl}
              alt="Evidence"
              width="250"
            />
          )}
        </div>
      ))}
    </div>
  );
};

export default ProgressEvidenceTimeline;