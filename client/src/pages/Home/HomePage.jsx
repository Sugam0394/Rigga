 import "./HomePage.css";

import EmptyStateCard from "./components/EmptyStateCard";
import ActiveChallengeCard from "./components/ActiveChallengeCard";
import RecentResultCard from "./components/RecentResultCard.jsx";

// State
import LoadingState from "./state/LoadingState";
import ErrorState from "./state/ErrorState";

// HomeScreen
import TodayFocusSection from "./HomeScreen/TodayFocusSection";

// Reminder
import HomeReminderSection
  from "../reminder/components/HomeReminderSection";

// Dashboard Runtime
import useDashboardRuntime
  from "../Dashboard/hooks/useDashboardRunTime";

import dashboardViewModel
  from "../Dashboard/viewModels/dashboardViewModel";

// Utils
import getReminderSummary
  from "../Home/utils/getReminderSummary";

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

  const recentResult =
    viewModel.recentResult;

  return (

    <div className="home-page">

      <TodayFocusSection
        immediateAction={
          viewModel.immediateAction
        }
      />

      {commitments.length === 0 &&
      !recentResult ? (

        <EmptyStateCard />

      ) : (

        <>

          {commitments.length > 0 && (

            <section className="home-page__commitments">

              <header className="home-page__section-header">

                <p className="home-page__eyebrow">
                  ACTIVE COMMITMENTS
                </p>

                <h2 className="home-page__section-title">
                  Commitments Requiring Attention
                </h2>

              </header>

              {commitments.map(
                (challenge) => {

                  const reminderSummary =
                    getReminderSummary(
                      challenge.reminders
                    );

                  return (

                    <div key={challenge.id}>

                      <ActiveChallengeCard
                        challenge={challenge}
                      />

                      <HomeReminderSection
                        reminderSummary={
                          reminderSummary
                        }
                      />

                    </div>

                  );

                }
              )}

            </section>

          )}

          {recentResult && (

            <section className="home-page__recent-result">

              <header className="home-page__section-header">

                <p className="home-page__eyebrow">
                  RECENT RESULT
                </p>

                <h2 className="home-page__section-title">
                  Latest Completed Commitment
                </h2>

              </header>

              <RecentResultCard
                result={recentResult}
              />

            </section>

          )}

        </>

      )}

    </div>

  );

}

export default HomePage;