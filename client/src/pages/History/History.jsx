 import useChallengeHistory
  from "./hooks/useChallengeHistory.js";

import HistoryChallengeCard
  from "./components/HistoryChallengeCard.jsx";

import HistoryLoadingState
  from "./components/HistoryLoadingState.jsx";

import HistoryErrorState
  from "./components/HistoryErrorState.jsx";

import HistoryEmptyState
  from "./components/HistoryEmptyState.jsx";

import "./HistoryPage.css";

const HistoryPage = () => {

  const {
    history,
    loading,
    error,
    refresh,
  } = useChallengeHistory();

  if (loading) {
    return <HistoryLoadingState />;
  }

  if (error) {
    return (
      <HistoryErrorState
        onRetry={refresh}
      />
    );
  }

  if (history.length === 0) {
    return <HistoryEmptyState />;
  }

  return (
    <main className="history-page">

      <header className="history-page__header">

        <h1 className="history-page__title">
          Challenge History
        </h1>

        <p className="history-page__subtitle">
          Review your completed and failed
          commitments.
        </p>

      </header>

      <section className="history-page__list">

        {history.map((item) => (
          <HistoryChallengeCard
            key={item.id}
            history={item}
          />
        ))}

      </section>

    </main>
  );

};

export default HistoryPage;