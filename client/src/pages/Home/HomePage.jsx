 import { useEffect, useState } from "react";
import { getChallenges } from "./api/challengeApi";

function HomePage() {
  const [challenges, setChallenges] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

 const fetchChallenges = async () => {
  try {
    setLoading(true);
    setError(null);

    const data = await getChallenges();

    console.log("API DATA:", data);

    setChallenges(data);
  } catch (err) {
    console.log("API ERROR:", err);

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

  console.log({
    challenges,
    loading,
    error,
  });

  return (
  <div>
    <h1>Rigga Home</h1>

    <p>Loading: {loading ? "Yes" : "No"}</p>

    <p>Error: {error || "None"}</p>

    <pre>
      {JSON.stringify(challenges, null, 2)}
    </pre>
  </div>
);
}

export default HomePage;