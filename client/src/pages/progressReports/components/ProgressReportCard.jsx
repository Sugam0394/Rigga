 import "./ProgressReportCard.css";

const BASE_URL =
  import.meta.env.VITE_API_BASE_URL
    ?.replace("/api", "") || "";

const ProgressReportCard = ({
  report,
}) => {
  const formattedDate =
    new Date(
      report.createdAt
    ).toLocaleString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });

  return (
    <article className="progress-report">
      <p className="progress-report__date">
        {formattedDate}
      </p>

      <p className="progress-report__notes">
        {report.notes}
      </p>

      {report.imageUrl && (
        <>
          <p className="progress-report__label">
           Submitted Evidence
          </p>

          <img
            className="progress-report__image"
            src={`${BASE_URL}${report.imageUrl}`}
            alt="Progress Evidence"
          />
        </>
      )}
    </article>
  );
};

export default ProgressReportCard;