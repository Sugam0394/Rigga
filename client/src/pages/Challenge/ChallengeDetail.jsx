import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../../services/api";
import { useAuth } from "../../context/AuthContext";

import "./ChallengeDetail.css";

const ChallengeDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();

  const [challenge, setChallenge] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const handleAcceptChallenge = () => {
    const isLocked =
      challenge.isPaid === true &&
      user?.subscriptionStatus === "free";

    if (isLocked) {
      navigate("/subscribe");
      return;
    }

    navigate("/create", {
      state: {
        challengeId: challenge._id,
        challengeTitle: challenge.title,
        stakeType: challenge.stakeType,
        consequence: challenge.consequence,
      },
    });
  };

  useEffect(() => {
    const fetchChallenge = async () => {
      try {
        setLoading(true);
        const res = await api.get(`/challenges/${id}`);
        const challengeData = res.data.challenge || res.data;
        setChallenge(challengeData);
        setError(false);
      } catch (err) {
        console.error("CHALLENGE DETAIL ERROR:", err);
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchChallenge();
  }, [id]);

  if (loading) {
    return (
      <div className="challenge-detail-page">
        <div className="skeleton skeleton-lg"></div>
        <div className="skeleton skeleton-md"></div>
        <div className="skeleton skeleton-sm"></div>
      </div>
    );
  }

  if (error || !challenge) {
    return (
      <div className="challenge-detail-page error-state">
        <h1>Challenge nahi mila</h1>
        <button onClick={() => navigate("/challenges")}>
          Back to Challenges
        </button>
      </div>
    );
  }

  return (
    <div className="challenge-detail-page">
      {/* TOP SECTION */}
      <div className="detail-top">
        <div className="top-header">
          <button className="back-btn" onClick={() => navigate("/challenges")}>
            ← Back
          </button>
          <span className={challenge.isPaid ? "paid-badge" : "free-badge"}>
            {challenge.isPaid ? "PRO" : "FREE"}
          </span>
        </div>

        <h1>{challenge.title}</h1>

        <div className="challenge-meta">
          <span>{challenge.category}</span>
          <span>{challenge.difficulty || "Medium"}</span>
        </div>

        <div className="description-box">
          <h3>Description</h3>
          <p>{challenge.description}</p>
        </div>
      </div>

      {/* CONSEQUENCE SECTION */}
      <div className="consequence-section">
        <h2>⚠️ AGAR FAIL HUA:</h2>
        <p>{challenge.consequence || "No consequence defined yet."}</p>
        <span>Yeh serious hai. Soch lo.</span>
      </div>

      {/* RULES + CTA */}
      <div className="rules-section">
        <h3>Rules:</h3>
        <ul>
          <li>Roz proof submit karna hai</li>
          <li>Witness real hona chahiye</li>
          <li>AI proof verify karega</li>
        </ul>

        {challenge.isPaid && user?.subscriptionStatus === "free" && (
          <div className="locked-warning">
            🔒 This is a Pro challenge. Subscribe to continue.
          </div>
        )}

        <button className="accept-btn" onClick={handleAcceptChallenge}>
          Accept Challenge →
        </button>
      </div>
    </div>
  );
};

export default ChallengeDetail;