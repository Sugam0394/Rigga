 import "./ProgressSummaryCard.css";

import { getProgressStatus } from "../utils/progressPercentage";
import { getStreakStatus } from "../utils/streakStatus";

   const ProgressSummaryCard = ({
  progress,
}) => {
  const progressStatus =
    getProgressStatus(
      progress.progressPercentage ?? 0
    );

  const streakStatus =
    getStreakStatus(
      progress.currentStreak ?? 0
    );

  return (
    <section className="progress-summary-card">
      <h2 className="progress-summary-card__title">
        Progress &amp; Evidence
      </h2>

      <p className="progress-summary-card__count">
        {progress.totalReports}
      </p>

      <p className="progress-summary-card__label">
        Evidence Submitted
      </p>

      <div className="progress-summary-card__progress">
        <div className="progress-summary-card__track">
          <div
            className={`progress-summary-card__fill progress-summary-card__fill--${progressStatus.variant}`}
            style={{
              width: `${progress.progressPercentage ?? 0}%`,
            }}
          />
        </div>

        <span
          className={`progress-summary-card__percentage progress-summary-card__percentage--${progressStatus.variant}`}
        >
          {progressStatus.color === "green" && "🟢 "}
          {progressStatus.color === "yellow" && "🟡 "}
          {progressStatus.color === "orange" && "🟠 "}
          {progressStatus.color === "red" && "🔴 "}

          {progressStatus.text}
        </span>
      </div>

      <div className="progress-summary-card__latest">
        {progress.latestReportDate ? (
          <>
            <p>
              📅 Latest Submission
            </p>

            <p>
              {new Date(
                progress.latestReportDate
              ).toLocaleDateString()}
            </p>
          </>
        ) : (
          <p>
            No evidence has been submitted yet.
          </p>
        )}
      </div>

      <div
        className={`progress-summary-card__streak progress-summary-card__streak--${streakStatus.variant}`}
      >
        <span>
          🔥 Consistency Streak
        </span>

        <strong>
          {streakStatus.color === "blue" && "🔵 "}
          {streakStatus.color === "green" && "🟢 "}
          {streakStatus.color === "orange" && "🟠 "}
          {streakStatus.color === "red" && "🔴 "}
          {streakStatus.color === "gray" && "⚪ "}

          {streakStatus.text}
        </strong>
      </div>
    </section>
  );
};

export default ProgressSummaryCard

 