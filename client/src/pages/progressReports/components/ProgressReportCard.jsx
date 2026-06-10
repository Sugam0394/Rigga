const ProgressReportCard = ({
  report,
}) => {
  return (
    <div>
      <h3>
        Progress Report
      </h3>

      <p>
        Date:
        {" "}
        {new Date(
          report.createdAt
        ).toLocaleDateString()}
      </p>

      <p>
        {report.notes}
      </p>

      {report.imageUrl && (
        <img
          src={`http://localhost:3000${report.imageUrl}`}
          alt="Progress Evidence"
          width="250"
        />
      )}
    </div>
  );
};

export default ProgressReportCard;