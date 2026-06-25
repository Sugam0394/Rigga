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
import getNextAction from "./components/getNextAction";




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

// AI Narrative
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

 const handleShareWithWitness = async () => {
  const witness = dashboard.witness;

  const message = `Hey ${witness.name},

Please review my Rigga commitment.`;

  try {
    await trackWitnessShare(id);
  } catch (error) {
    console.error(
      "Unable to track witness share.",
      error
    );
  }

  openWhatsAppShare({
    phone: witness.phone,
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
const nextAction =
  getNextAction(
    dashboard.challenge.status
  );

 return (
  <div className="challenge-details-page">
    <div className="challenge-details-container">

      {/* Challenge Identity */}
      <ChallengeHeaderCard
        title={dashboard.challenge.title}
        deadlineAt={dashboard.challenge.deadlineAt}
        status={dashboard.challenge.status}
      />

      {/* Current Accountability State */}
      <ChallengeStatusCard
        status={dashboard.challenge.status}
      />

      {/* Immediate Next Step */}
    <NextActionCard
  title={nextAction.title}
  description={nextAction.description}
>

  {/* Existing buttons & messages remain here */}

  {dashboard.challenge.status ===
    "ACTIVE" &&
    !eligibilityLoading &&
    eligibility?.canSubmit && (
      <button
        className="challenge-details-button"
        onClick={handleSubmitProgress}
      >
        Submit Progress Report
      </button>
  )}

  {dashboard.challenge.status ===
    "REJECTED" && (
      <button
        className="challenge-details-button"
        onClick={handleSubmitAppeal}
      >
        Submit Appeal
      </button>
  )}

 {dashboard.challenge.status ===
  "ACTIVE" &&
  dashboard.witness?.phone && (
    <button
      className="challenge-details-button"
      onClick={handleShareWithWitness}
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



      {/* Accountability Plan */}
      <AccountabilityPlanCard
        accountabilityPlan={
          dashboard.accountabilityPlan
        }
      />

      {/* Progress Summary */}
      <ProgressSummaryCard
        progress={dashboard.progress}
      />

      {/* Progress & Evidence */}
      <ProgressReportList
        reports={reports}
        loading={reportsLoading}
        error={reportsError}
      />

      {/* Checkpoint Journey */}
      <CheckpointSummaryCard
        checkpoints={dashboard.checkpoints}
      />

      {/* Witness Verification */}
      <WitnessAccountabilityCard
        witness={dashboard.witness}
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

      {/* Appeal */}
      {dashboard.challenge.status ===
        "APPEALED" && (
        <AppealStatusCard />
      )}

      {/* Consequence */}
      <ConsequenceStatusCard
        consequence={dashboard.consequence}
      />

      {/* AI Insights */}
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

      {/* AI Narrative */}
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

      {/* AI Coach */}
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

    </div>
  </div>
);
};

export default ChallengeDetailsPage;