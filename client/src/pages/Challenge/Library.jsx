 import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import api from "../../services/api";
import "./ChallengeLibrary.css";

const ChallengeLibrary = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  const [allChallenges, setAllChallenges] = useState([]);
  const [filteredChallenges, setFilteredChallenges] = useState([]);
  const [activeFilter, setActiveFilter] = useState("all");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;
    const fetchChallenges = async () => {
      try {
        setLoading(true);
        const res = await api.get("/challenges");
        if (isMounted) {
          const data = res.data.challenges || [];
          setAllChallenges(data);
          setFilteredChallenges(data);
        }
      } catch (error) {
        console.log("FETCH CHALLENGES ERROR:", error);
      } finally {
        if (isMounted) setLoading(false);
      }
    };
    fetchChallenges();
    return () => { isMounted = false; };
  }, []);

  const handleFilter = (filter) => {
    setActiveFilter(filter);
    if (filter === "all") {
      setFilteredChallenges(allChallenges);
      return;
    }
    if (filter === "free") {
      const freeOnes = allChallenges.filter(c => c.isPaid === false);
      setFilteredChallenges(freeOnes);
      return;
    }
    const filtered = allChallenges.filter(
      (c) => c.category.toLowerCase() === filter.toLowerCase()
    );
    setFilteredChallenges(filtered);
  };

  const handleChallengeAccess = (challenge) => {
    const isLocked = challenge.isPaid === true && user?.subscriptionStatus === "free";
    if (isLocked) {
      navigate("/subscribe");
      return;
    }
    navigate(`/challenges/${challenge._id}`);
  };

  return (
    <div className="challenge-library">
      <div className="challenge-top">
        <h1>Challenges</h1>
        {/* Step 6A: Challenge Count */}
        <p className="challenge-count">
          {filteredChallenges.length} challenges found
        </p>
        
        <div className="filter-bar">
          {["all", "free", "fitness", "study", "discipline", "social"].map((f) => (
            <button
              key={f}
              className={activeFilter === f ? "active-filter" : ""}
              onClick={() => handleFilter(f)}
            >
              {f.charAt(0).toUpperCase() + f.slice(1)}
            </button>
          ))}
        </div>
      </div>

      <div className="challenge-grid">
        {loading ? (
          <p className="loading-text">Loading challenges...</p>
        ) : filteredChallenges.length === 0 ? (
          /* Step 6B: Empty State */
          <div className="empty-state">
            <h2>No challenges found</h2>
            <p>Try selecting another category filter.</p>
          </div>
        ) : (
          filteredChallenges.map((challenge) => {
            const isLocked = challenge.isPaid === true && user?.subscriptionStatus === "free";

            return (
              /* Step 6E: Card Click Navigation */
              <div
                className={`challenge-card ${isLocked ? "locked-card" : "free-card"}`}
                key={challenge._id}
                onClick={() => handleChallengeAccess(challenge)}
              >
                <div className="card-top">
                  <span className="category-badge">{challenge.category}</span>
                  {isLocked ? (
                    <span className="pro-badge">🔒 PRO</span>
                  ) : (
                    <span className="free-badge">FREE</span>
                  )}
                </div>

                <h2>{challenge.title}</h2>
                <p className="difficulty">{challenge.difficulty}</p>

                <div className="consequence-box">
                  <h4>Consequence:</h4>
                  <p>{challenge.consequence}</p>
                </div>

                <button
                  className={`challenge-btn ${isLocked ? "locked-btn" : ""}`}
                  /* Step 6E: Stop Propagation to avoid double triggers */
                  onClick={(e) => e.stopPropagation()} 
                >
                  {isLocked ? "Subscribe to Unlock" : "Challenge Lo →"}
                </button>
              </div>
            );
          })
        )}
      </div>

      {user?.subscriptionStatus === "free" && (
        <div className="subscription-banner">
          <h3>20+ challenges unlock karo — ₹199/month</h3>
          <button onClick={() => navigate("/subscribe")}>Subscribe</button>
        </div>
      )}
    </div>
  );
};

export default ChallengeLibrary;