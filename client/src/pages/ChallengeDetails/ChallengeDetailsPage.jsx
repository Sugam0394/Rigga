 import { useParams , useNavigate } from "react-router-dom";

import useChallengeDashboard from "./hooks/useChallengeashboard";
import ChallengeHeaderCard from "./components/ChallengeHeaderCard";
import ChallengeStatusCard from "./components/ChallengeStatusCard";
import CheckpointSummaryCard from "./components/CheckpointSummaryCard";
import ProgressSummaryCard from "./components/ProgressSummaryCard";
import WitnessAccountabilityCard from "./components/WitnessAccountabilityCard";
import ConsequenceStatusCard from "./components/ConsequencesStatusCard";
import useProgressReports from "../progressReports/hooks/useProgressReports";

import ProgressReportList from "../progressReports/components/ProgressReportList";


const ChallengeDetailsPage = () => {
  const { id } = useParams();
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


  if (loading) {
    return (
      <div>
        Loading challenge...
      </div>
    );
  }

  if (error) {
    return (
      <div>
        <p>{error}</p>

        <button
          onClick={retry}
        >
          Retry
        </button>
      </div>
    );
  }

  if (!dashboard) {
    return (
      <div>
        Challenge not found.
      </div>
    );
  }

  return (
    <div>
     <ChallengeHeaderCard
  title={
    dashboard.challenge.title
  }
  deadline={
    dashboard.challenge.deadline
  }
  status={
    dashboard.challenge.status
  }
/>
<ChallengeStatusCard
  status={
    dashboard.challenge.status
  }
/>
{dashboard.challenge.status ===
  "ACTIVE" && (
  <button
    onClick={
      handleSubmitProgress
    }
  >
    Submit Progress Report
  </button>
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
  );
};

export default ChallengeDetailsPage;