import { useEffect, useState } from "react";
import { getChallenges } from "./api/challengeApi";

import HomeHeader from "./components/HomeHeader";
import EmptyStateCard from "./components/EmptyStateCard";
import ActiveChallengeCard from "./components/ActiveChallengeCard";
 

// State
import LoadingState from "./state/LoadingState"
import ErrorState from "./state/ErrorState";



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

  if (
    challenges.length === 0
  ) {
    return (
      <div>
        <HomeHeader />

        <EmptyStateCard />
      </div>
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
        gap: "16px",
      }}
    >
      <HomeHeader />

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
    </div>
  );
}

export default HomePage;