 import "./ProgressReportCard.css";

const BASE_URL =
  import.meta.env.VITE_API_BASE_URL
    ?.replace("/api", "") || "";

const ProgressReportCard = ({
  report,
}) => {

 const formattedDate =
  report?.timestamp
    ? new Date(report.timestamp).toLocaleDateString(
        "en-US",
        {
          month: "short",
          day: "numeric",
          year: "numeric",
        }
      )
    : "Unknown date";

  return (

    <article className="progress-report">

      <p className="progress-report__date">
        {formattedDate}
      </p>

      <p className="progress-report__notes">
        {
           report.metadata?.notes ||
"No progress notes provided."
        }
      </p>

      {report.metadata?.imageUrl && (

        <>

          <p className="progress-report__label">
            Submitted Evidence
          </p>

          <img
            className="progress-report__image"
            src={`${BASE_URL}${report.metadata.imageUrl}`}
            alt="Progress Evidence"
          />

        </>

      )}

    </article>

  );

};

export default ProgressReportCard;