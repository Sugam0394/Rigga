 import { useEffect, useState } from "react";
import { getChallenges } from "./api/challengeApi";
import "./HomePage.css";

import EmptyStateCard from "./components/EmptyStateCard";
import ActiveChallengeCard from "./components/ActiveChallengeCard";
 
// State
import LoadingState from "./state/LoadingState"
import ErrorState from "./state/ErrorState";

// HomeScreen 
import TodayFocusSection from "./HomeScreen/TodayFocusSection";
 
// utils
import { determineImmediateAction, sortChallenges } from "./utils/homePriority";

function HomePage() {
  const [challenges, setChallenges] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const immediateAction = determineImmediateAction(challenges);
  const sortedChallenges = sortChallenges(challenges);

  const fetchChallenges = async () => {
    try {
      setLoading(true);
      setError(null);

      const data = await getChallenges();
      setChallenges(data);
    } catch (err) {
      setError(
        err?.response?.data?.message || "Something went wrong"
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    fetchChallenges();
  }, []);

  if (loading) {
    return <LoadingState />;
  }

  if (error) {
    return (
      <ErrorState
        message={error}
        onRetry={fetchChallenges}
      />
    );
  }

  return (
    <div className="home-page">
      <TodayFocusSection immediateAction={immediateAction} />
 
      {challenges.length === 0 ? (
        <EmptyStateCard />
      ) : (
        <>
          <section>
            <h2 className="home-page__section-title">
              Commitments Requiring Attention
            </h2>
          </section>

          {sortedChallenges.map((challenge) => (
            <ActiveChallengeCard
              key={challenge._id}
              challenge={challenge}
            />
          ))}
        </>
      )}
    </div>
  );
}

export default HomePage;