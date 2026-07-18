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

  <div className="progress-report__header">
    <p className="progress-report__eyebrow">
      Evidence Submitted
    </p>

    <p className="progress-report__date">
      {formattedDate}
    </p>
  </div>

  <div className="progress-report__content">

    <p className="progress-report__notes">
      {report.metadata?.notes ||
        "No progress notes provided."}
    </p>

    {report.metadata?.imageUrl && (
      <div className="progress-report__evidence">

        <p className="progress-report__label">
          Submitted Evidence
        </p>

        <img
          className="progress-report__image"
          src={`${BASE_URL}${report.metadata.imageUrl}`}
          alt="Progress Evidence"
        />

      </div>
    )}

  </div>

</article>

  );

};

export default ProgressReportCard;