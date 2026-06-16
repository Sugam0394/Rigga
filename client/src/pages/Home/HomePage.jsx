import { useEffect, useState } from "react";
import { getChallenges } from "./api/challengeApi";

import HomeHeader from "./components/HomeHeader";
import EmptyStateCard from "./components/EmptyStateCard";
import ActiveChallengeCard from "./components/ActiveChallengeCard";
 

// State
import LoadingState from "./state/LoadingState"
import ErrorState from "./state/ErrorState";

// HomeScreen 
import WelcomeSection from "./HomeScreen/WelcomeSection";
import TodayFocusSection from "./HomeScreen/TodayFocusSection";
import RecentActivitySection from "./HomeScreen/RecentActivitySection"

 function HomePage() {
  const [challenges, setChallenges] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState(null);

  const fetchChallenges =
    async () => {
      try {
        setLoading(true);
        setError(null);

        const data =
          await getChallenges();

        setChallenges(data);
      } catch (err) {
        setError(
          err?.response?.data
            ?.message ||
            "Something went wrong"
        );
      } finally {
        setLoading(false);
      }
    };

  useEffect(() => {
    fetchChallenges();
  }, []);

  if (loading) {
  return <LoadingState />;
}

  if (error) {
  return (
    <ErrorState
      message={error}
      onRetry={
        fetchChallenges
      }
    />
  );
}

 
 
  return (
  <div
    style={{
      maxWidth: "900px",
      margin: "0 auto",
      padding: "16px",
      display: "flex",
      flexDirection: "column",
      gap: "24px",
    }}
  >
    <HomeHeader />

    <WelcomeSection
      commitmentCount={
        challenges.length
      }
    />

    <TodayFocusSection />

    {challenges.length === 0 ? (
      <EmptyStateCard />
    ) : (
      <>
        <section>
          <h2>
            Active Commitments
          </h2>
        </section>

        {challenges.map(
          (challenge) => (
            <ActiveChallengeCard
              key={
                challenge._id
              }
              challenge={
                challenge
              }
            />
          )
        )}

        <RecentActivitySection />
      </>
    )}
  </div>
);
}

export default HomePage;