 import { useParams , useNavigate } from "react-router-dom";
 // css 
import "./ChallengeDetailsPage.css";

// hooks
import useChallengeDashboard from "./hooks/useChallengeashboard";

// components 
import ChallengeHeaderCard from "./components/ChallengeHeaderCard";
import ChallengeStatusCard from "./components/ChallengeStatusCard";
import CheckpointSummaryCard from "./components/CheckpointSummaryCard";
import ProgressSummaryCard from "./components/ProgressSummaryCard";
import WitnessAccountabilityCard from "./components/WitnessAccountabilityCard";
import ConsequenceStatusCard from "./components/ConsequencesStatusCard";
import ProgressReportList from "../progressReports/components/ProgressReportList";

// Hooks
import useProgressReports from "../progressReports/hooks/useProgressReports";
import useProgressEligibility from "../progressReports/hooks/useProgressEligibility";
// appeals
import AppealStatusCard from "../appeals/components/AppealStatusCard";
// utils
import { openWhatsAppShare } from "../../utils/whatsappShare";
import WitnessAnalyticsCard from "../WitnessReview/WitnessAnalyticsCard";
import { trackWitnessShare } from "../WitnessReview/api/reviewApi";
import useWitnessAnalytics from "../WitnessReview/hooks/useWitnessAnalytics";


const ChallengeDetailsPage = () => {
  const { id } = useParams();
   const {
  eligibility,
  loading: eligibilityLoading,
  error: eligibilityError,
} = useProgressEligibility(id);
  const {
  reports,
  loading: reportsLoading,
  error: reportsError,
} = useProgressReports(id);
const navigate = useNavigate();
  const {
    dashboard,
    loading,
    error,
    retry,
  } = useChallengeDashboard(id);

const handleSubmitProgress =
  () => {
    navigate(
      `/challenges/${id}/progress-report`
    );
  };

  const handleSubmitAppeal = () => {
    navigate(
      `/challenges/${id}/appeal`
    );
  };

 const handleShareWithWitness =  async () => {

    const witness =
      dashboard.witness;

    const message =
      `Hey ${witness.name},

Please review my Rigga commitment.`;

    await trackWitnessShare(
      id
    );

    openWhatsAppShare({
      phone:
        witness.phone,
      message,
    });
  };

   const {
  analytics,
  loading:
    analyticsLoading,
  error:
    analyticsError,
} = useWitnessAnalytics(id);

 if (loading) {
  return (
    <div className="challenge-state">
      <h2 className="challenge-state__title">
        Loading Challenge
      </h2>

      <p className="challenge-state__message">
        Preparing your accountability dashboard...
      </p>
    </div>
  );
}

 if (error) {
  return (
    <div className="challenge-state">
      <h2 className="challenge-state__title">
        Unable To Load Challenge
      </h2>

      <p className="challenge-state__message">
        {error}
      </p>

      <button
        className="challenge-state__button"
        onClick={retry}
      >
        Try Again
      </button>
    </div>
  );
}

 if (!dashboard) {
  return (
    <div className="challenge-state">
      <h2 className="challenge-state__title">
        Challenge Not Found
      </h2>

      <p className="challenge-state__message">
        This challenge may have been removed
        or is no longer available.
      </p>
    </div>
  );
}

console.log(
  dashboard?.witness
);

  return (
  <div className="challenge-details-page">
    <div className="challenge-details-container">

      <ChallengeHeaderCard
        title={dashboard.challenge.title}
        deadlineAt={dashboard.challenge.deadlineAt}
        status={dashboard.challenge.status}
      />

      <div className="challenge-details-actions">

  {dashboard.challenge.status ===
    "ACTIVE" &&
    !eligibilityLoading &&
    eligibility?.canSubmit && (
      <button
        className="challenge-details-button"
        onClick={
          handleSubmitProgress
        }
      >
        Submit Progress Report
      </button>
  )}

  {dashboard.challenge.status ===
    "ACTIVE" &&
    !eligibilityLoading &&
    eligibility &&
    !eligibility.canSubmit && (
    <p className="challenge-details-accountability-message">
  You have already submitted evidence today.
  Return tomorrow to continue building accountability.
</p>
  )}

  {dashboard.challenge.status ===
    "REJECTED" && (
      <button
        className="challenge-details-button"
        onClick={
          handleSubmitAppeal
        }
      >
        Submit Appeal
      </button>
  )}

  {eligibilityError && (
  <p className="challenge-details-error">
    Unable to check submission eligibility.
    Please refresh.
  </p>
)}

{dashboard.witness?.phone && (
  <button
    className="challenge-details-button"
    onClick={
      handleShareWithWitness
    }
  >
    Share With Witness
  </button>
)}

{analyticsLoading && (
  <p>
    Loading witness analytics...
  </p>
)}

{analyticsError && (
  <p>
    Unable to load witness analytics.
  </p>
)}

 {analytics && (
  <WitnessAnalyticsCard
    analytics={analytics}
  />
)}

</div>

      <ChallengeStatusCard
        status={
          dashboard.challenge.status
        }
      />

      {dashboard.challenge.status ===
        "APPEALED" && (
        <AppealStatusCard />
      )}

      <CheckpointSummaryCard
        checkpoints={
          dashboard.checkpoints
        }
      />

      <ProgressSummaryCard
        progress={
          dashboard.progress
        }
      />

      <WitnessAccountabilityCard
        witness={
          dashboard.witness
        }
      />

      <ConsequenceStatusCard
        consequence={
          dashboard.consequence
        }
      />

      <ProgressReportList
        reports={reports}
        loading={reportsLoading}
        error={reportsError}
      />
    </div>
  </div>
);
};

export default ChallengeDetailsPage;