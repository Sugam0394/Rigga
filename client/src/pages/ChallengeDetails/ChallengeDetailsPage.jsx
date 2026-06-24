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
import NextActionCard from "./components/NextActionCard";
import AccountabilityPlanCard from "../../components/AccountabilityPlanCard";

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

// AiInsight 
import useAIInsights from "../../features/ai-insights/hooks/useAIInsights";

import AIInsightsCard from "../../features/ai-insights/components/AIInsightsCard";

import AIInsightsEmptyState from "../../features/ai-insights/state/AIEmptyState";
import AIInsightsErrorState from "../../features/ai-insights/state/AIErrorState";
import AIInsightsLoadingState from "../../features/ai-insights/state/AILoadingState";

// A INarrative

 import useAINarrative
  from "../../features/ai-narrative/hooks/useAINarrative";

import AINarrativeCard
  from "../../features/ai-narrative/components/AINarrativeCard";

import AINarrativeLoadingState
  from "../../features/ai-narrative/state/LoadingState";

import AINarrativeErrorState
  from "../../features/ai-narrative/state/ErrorState";

import AINarrativeEmptyState
  from "../../features/ai-narrative/state/EmptyState";

// AI COUCH

import useAICoach
  from "../../features/ai-couch/hooks/useAiCounch";

import AICoachCard
  from "../../features/ai-couch/components/AICouchCard";

import AICoachLoadingState
  from "../../features/ai-couch/state/loadingState";

import AICoachErrorState
  from "../../features/ai-couch/state/ErrorState";

import AICoachEmptyState
  from "../../features/ai-couch/state/EmptyState";





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
  insights,
  loading:
    insightsLoading,
  error:
    insightsError,
} =
useAIInsights(id);

const {
  narrative,
  loading:
    narrativeLoading,
  error:
    narrativeError,
} =
useAINarrative(id);

   const {
  analytics,
  loading:
    analyticsLoading,
  error:
    analyticsError,
} = useWitnessAnalytics(id);

const {
  coach,
  loading:
    coachLoading,
  error:
    coachError,
} =
useAICoach(id);

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

      <ChallengeStatusCard
        status={
          dashboard.challenge.status
        }
      />

      <NextActionCard
        title={
          dashboard.challenge.status ===
          "ACTIVE"
            ? "Submit Progress Report"
            : dashboard.challenge.status ===
              "UNDER_REVIEW"
            ? "Await Witness Review"
            : dashboard.challenge.status ===
              "REJECTED"
            ? "Review Rejection"
            : dashboard.challenge.status ===
              "APPEALED"
            ? "Await Appeal Outcome"
            : dashboard.challenge.status ===
              "COMPLETED"
            ? "Commitment Verified"
            : "Commitment Closed"
        }
        description={
          dashboard.challenge.status ===
          "ACTIVE"
            ? "Continue building accountability by submitting evidence."
            : dashboard.challenge.status ===
              "UNDER_REVIEW"
            ? "Your witness is currently reviewing submitted evidence."
            : dashboard.challenge.status ===
              "REJECTED"
            ? "Review the witness decision and submit an appeal if necessary."
            : dashboard.challenge.status ===
              "APPEALED"
            ? "Your appeal is under review."
            : dashboard.challenge.status ===
              "COMPLETED"
            ? "No further action required."
            : "This commitment is no longer active."
        }
      >
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

        {eligibilityError && (
          <p className="challenge-details-error">
            Unable to check submission eligibility.
            Please refresh.
          </p>
        )}
      </NextActionCard>


    <AccountabilityPlanCard
  accountabilityPlan={
    dashboard.accountabilityPlan
  }
/>




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

      {insightsLoading && (
  <AIInsightsLoadingState />
)}

{insightsError && (
  <AIInsightsErrorState
    error={insightsError}
  />
)}

{!insightsLoading &&
 !insightsError &&
 !insights && (
  <AIInsightsEmptyState />
)}

{insights && (
  <AIInsightsCard
    insights={insights}
  />
)}

{narrativeLoading && (
  <AINarrativeLoadingState />
)}

{narrativeError && (
  <AINarrativeErrorState
    error={narrativeError}
  />
)}

{!narrativeLoading &&
 !narrativeError &&
 !narrative && (
  <AINarrativeEmptyState />
)}

{narrative && (
  <AINarrativeCard
    narrative={narrative}
  />
)}

{coachLoading && (
  <AICoachLoadingState />
)}

{coachError && (
  <AICoachErrorState
    error={coachError}
  />
)}

{!coachLoading &&
 !coachError &&
 !coach && (
  <AICoachEmptyState />
)}

{coach && (
  <AICoachCard
    coach={coach}
  />
)}

      {dashboard.challenge.status ===
        "APPEALED" && (
        <AppealStatusCard />
      )}

       <WitnessAccountabilityCard
        witness={
          dashboard.witness
        }
      />

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