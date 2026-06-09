import { useEffect, useState } from "react";
import { getChallenges } from "./api/challengeApi";

import HomeHeader from "./components/HomeHeader";
import EmptyStateCard from "./components/EmptyStateCard";
import ActiveChallengeCard from "./components/ActiveChallengeCard";
import ProgressSummaryCard from "./components/ProgressSummaryCard";
import CheckpointCard from "./components/CheckpointCard";
import AccountabilityCard from "./components/AccountabilityCard";
 



function HomePage() {
 
  const [challenges, setChallenges] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

 

  const fetchChallenges = async () => {
    try {
      setLoading(true);
      setError(null);

      const data = await getChallenges();

      setChallenges(data);
    } catch (err) {
      setError(
        err?.response?.data?.message ||
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
    return <p>Loading...</p>;
  }

  if (error) {
    return (
      <div>
        <p>{error}</p>

        <button onClick={fetchChallenges}>
          Retry
        </button>
      </div>
    );
  }

  if (challenges.length === 0) {
    return (
      <div>
        <HomeHeader />
        <EmptyStateCard />
      </div>
    );
  }

  const activeChallenge = challenges[0];

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

      <ActiveChallengeCard
        challenge={activeChallenge}
      />

      <ProgressSummaryCard
        submittedReports={0}
        totalReports={0}
      />

      <CheckpointCard
        deadline={activeChallenge.deadline}
      />

      <AccountabilityCard
        witnessName={
          activeChallenge.witness?.name ||
          "Not Assigned"
        }
        witnessStatus={
          activeChallenge.status
        }
      />
    </div>
  );
}

export default HomePage;