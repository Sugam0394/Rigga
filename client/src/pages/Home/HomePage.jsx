 import "./HomePage.css";

import EmptyStateCard from "./components/EmptyStateCard";
import ActiveChallengeCard from "./components/ActiveChallengeCard";

// State
import LoadingState from "./state/LoadingState";
import ErrorState from "./state/ErrorState";

// HomeScreen
import TodayFocusSection from "./HomeScreen/TodayFocusSection";

// Dashboard Runtime
import useDashboardRuntime from "../Dashboard/hooks/useDashboardRunTime";
import dashboardViewModel from "../Dashboard/viewModels/dashboardViewModel";

function HomePage() {

  const {
    dashboard,
    loading,
    error,
    refresh,
  } = useDashboardRuntime();

  const viewModel =
    dashboardViewModel.buildDashboardViewModel(
      dashboard
    );

  if (loading) {
    return <LoadingState />;
  }

  if (error) {
    return (
      <ErrorState
        message={error}
        onRetry={refresh}
      />
    );
  }

  if (!viewModel) {
    return null;
  }

   const commitments =
  viewModel.activeCommitments ?? [];

return (
  <div className="home-page">

    <TodayFocusSection
      immediateAction={
        viewModel.immediateAction
      }
    />

    {commitments.length === 0 ? (

      <EmptyStateCard />

    ) : (

      <>

        <section>

          <h2 className="home-page__section-title">
            Commitments Requiring Attention
          </h2>

        </section>

        {commitments.map(
          (challenge) => (

            <ActiveChallengeCard
              key={challenge.id}
              challenge={challenge}
            />

          )
        )}

      </>

    )}

  </div>
);
}

export default HomePage;