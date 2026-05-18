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

  const [showConsent, setShowConsent] = useState(false);

  const [agreed, setAgreed] = useState(false);

  /**
   * OPEN CONSENT MODAL
   */
  const handleAcceptChallenge = () => {
    const isLocked =
      challenge.isPaid === true &&
      user?.subscriptionStatus === "free";

    if (isLocked) {
      navigate("/subscribe");
      return;
    }

    setShowConsent(true);
  };

  /**
   * FINAL CONFIRM
   */
  const handleConfirm = () => {
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

          <button
            className="back-btn"
            onClick={() => navigate("/challenges")}
          >
            ← Back
          </button>

          <span
            className={
              challenge.isPaid
                ? "paid-badge"
                : "free-badge"
            }
          >
            {challenge.isPaid ? "PRO" : "FREE"}
          </span>

        </div>

        <h1>{challenge.title}</h1>

        <div className="challenge-meta">
          <span>{challenge.category}</span>

          <span>
            {challenge.difficulty || "Medium"}
          </span>
        </div>

        <div className="description-box">
          <h3>Description</h3>

          <p>{challenge.description}</p>
        </div>

      </div>

      {/* CONSEQUENCE */}
      <div className="consequence-section">

        <h2>⚠️ AGAR FAIL HUA:</h2>

        <p>
          {challenge.consequence ||
            "No consequence defined yet."}
        </p>

        <span>
          Yeh serious hai. Soch lo.
        </span>

      </div>

      {/* RULES */}
      <div className="rules-section">

        <h3>Rules:</h3>

        <ul>
          <li>Roz proof submit karna hai</li>

          <li>Witness real hona chahiye</li>

          <li>AI proof verify karega</li>
        </ul>

        {challenge.isPaid &&
          user?.subscriptionStatus === "free" && (
            <div className="locked-warning">
              🔒 This is a Pro challenge.
              Subscribe to continue.
            </div>
          )}

        <button
          className="accept-btn"
          onClick={handleAcceptChallenge}
        >
          Accept Challenge →
        </button>

      </div>

      {/* CONSENT MODAL */}
      {showConsent && (
        <div className="consent-overlay">

          <div className="consent-modal">

            <h2>
              ⚠️ CHALLENGE ACCEPT KARNE SE
              PEHLE PADHO
            </h2>

            <div className="challenge-info">
              <p>Challenge:</p>

              <h3>{challenge.title}</h3>
            </div>

            <div className="consequence-box">

              <h4>💀 AGAR FAIL HUA:</h4>

              <p>
                <strong>
                  {challenge.consequence}
                </strong>
              </p>

            </div>

            <div className="rules-box">

              <p>Rules:</p>

              <ul>
                <li>
                  Proof roz submit karni hai
                </li>

                <li>
                  Witness real hona chahiye
                </li>

                <li>
                  Consequences automatic execute
                  honge
                </li>

                <li>
                  Koi excuse, koi refund nahi
                </li>
              </ul>

            </div>

            <label className="checkbox-row">

              <input
                type="checkbox"
                checked={agreed}
                onChange={(e) =>
                  setAgreed(e.target.checked)
                }
              />

              <span>
                Main samajhta hun.
                Consequences real hain.
                Meri marzi se yeh challenge
                le raha hun.
              </span>

            </label>

            <div className="modal-buttons">

              <button
                className="cancel-btn"
                onClick={() => {
                  setShowConsent(false);
                  setAgreed(false);
                }}
              >
                Cancel
              </button>

              <button
                className="confirm-btn"
                disabled={!agreed}
                onClick={handleConfirm}
              >
                Confirm & Start →
              </button>

            </div>

          </div>

        </div>
      )}

    </div>
  );
};

export default ChallengeDetail;