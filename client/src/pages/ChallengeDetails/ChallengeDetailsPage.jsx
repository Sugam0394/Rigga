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
import ReminderSection from "../reminder/components/ReminderSection";



// Hooks
import useProgressEligibility from "../progressReports/hooks/useProgressEligibility";


// Reminder Hooks


import useReminders
  from "../reminder/hooks/useReminders";

import useReminderStatus
  from "../reminder/hooks/useReminderStatus";

import useReminderDecision
  from "../reminder/hooks/useReminderDecision";

import useReminderHistory
  from "../reminder/hooks/useReminderHistory";

import reminderViewModel
  from "../reminder/viewModels/reminderViewModel";


// appeals
import AppealStatusCard from "../appeals/components/AppealStatusCard";



 
 
 





const ChallengeDetailsPage = () => {
  const { id } = useParams();
   const {
  eligibility,
  loading: eligibilityLoading,
  error: eligibilityError,
} = useProgressEligibility(id);

const {
  reminders,
  loading: remindersLoading,
  error: remindersError,
} = useReminders(id);

const {
  status,
  loading: statusLoading,
  error: statusError,
} = useReminderStatus(id);

const {
  decision,
  loading: decisionLoading,
  error: decisionError,
} = useReminderDecision(id);

const {
  history,
  loading: historyLoading,
  error: historyError,
} = useReminderHistory(id);
 
const navigate = useNavigate();
  const {
    dashboard,
    loading,
    error,
    retry,
  } = useChallengeDashboard(id);

const handleSubmitProgress =  () => {
    navigate(
      `/challenges/${id}/progress-report`
    );
  };

  const handleSubmitAppeal = () => {
    navigate(
      `/challenges/${id}/appeal`
    );
  };

 

 
 

 

 

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

const reminderRuntime = reminderViewModel.buildReminderViewModel({

    reminders,

    status,

    decision,

    history,

    loading:
      remindersLoading ||
      statusLoading ||
      decisionLoading ||
      historyLoading,

    error:
      remindersError ||
      statusError ||
      decisionError ||
      historyError,

  });



const nextAction =  getNextAction(
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
  !eligibilityLoading &&
  eligibility &&
  !eligibility.canSubmit && (

  <div className="challenge-details-accountability-message">

    <p>
      {eligibility.reason}
    </p>

    {eligibility.nextEligibleAt && (
      <p>
        Next submission available:
        {" "}
        {new Date(
          eligibility.nextEligibleAt
        ).toLocaleString()}
      </p>
    )}

  </div>

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
  reports={dashboard.timeline}
/>

      {/* Checkpoint Journey */}
      <CheckpointSummaryCard
        checkpoints={dashboard.checkpoints}
      />

      {/* Witness Verification */}
      <WitnessAccountabilityCard
        witness={dashboard.witness}
      />


      <ReminderSection
  reminder={reminderRuntime}
/>

     
  

      {/* Appeal */}
      {dashboard.challenge.status ===
        "APPEALED" && (
        <AppealStatusCard />
      )}

      {/* Consequence */}
      <ConsequenceStatusCard
        consequence={dashboard.consequence}
      />
  

       

    </div>
  </div>
);
};

export default ChallengeDetailsPage;