 const BASE_URL = import.meta.env.VITE_API_BASE_URL
    ?.replace("/api", "") || "";

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
          src={`${BASE_URL}${report.imageUrl}`}
          alt="Progress Evidence"
          width="250"
        />
      )}
    </div>
  );
};

export default ProgressReportCard;