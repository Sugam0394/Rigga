import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../services/api";
import "./Task.css";

const Task = () => {
  const [task, setTask] = useState(null);
  const [loading, setLoading] = useState(true);

  const [timeLeft, setTimeLeft] = useState("");

  const [proofUrl, setProofUrl] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState("");

  const navigate = useNavigate();

  // 🔥 FETCH ACTIVE TASK
  useEffect(() => {
    const fetchTask = async () => {
      try {
        const res = await api.get("/active");

        if (res.data.activeTask) {
          setTask(res.data.activeTask);
        } else {
          setTask(null);
        }

      } catch (err) {

        console.error(
          "TASK FETCH ERROR:",
          err.response?.data || err.message
        );

      } finally {
        setLoading(false);
      }
    };

    fetchTask();
  }, []);

  // 🔥 LIVE COUNTDOWN
  useEffect(() => {
    if (!task?.deadline) return;

    const interval = setInterval(() => {

      const now = new Date().getTime();
      const deadline = new Date(task.deadline).getTime();

      const distance = deadline - now;

      if (distance <= 0) {
        setTimeLeft("EXPIRED");
        clearInterval(interval);
        return;
      }

      const hours = Math.floor(
        (distance % (1000 * 60 * 60 * 24)) /
        (1000 * 60 * 60)
      );

      const minutes = Math.floor(
        (distance % (1000 * 60 * 60)) /
        (1000 * 60)
      );

      const seconds = Math.floor(
        (distance % (1000 * 60)) / 1000
      );

      setTimeLeft(
        `${hours}h ${minutes}m ${seconds}s`
      );

    }, 1000);

    return () => clearInterval(interval);

  }, [task]);

  // 🔥 SUBMIT PROOF
  const handleSubmitProof = async () => {

    if (!proofUrl.trim()) {
      setMessage("Please enter proof image URL");
      return;
    }

    try {

      setSubmitting(true);
      setMessage("");

      const { data } = await api.post(
        `/${task._id}/submit-proof`,
        {
          proofUrl
        }
      );

      console.log("PROOF RESPONSE:", data);

      // ✅ SUCCESS
      if (data.status === "done") {

        setMessage("Proof accepted! 🎉");

        setTimeout(() => {
          navigate("/");
        }, 1500);

      }

      // ❌ FAILED
      else if (data.status === "failed") {

        setMessage("Proof rejected 💀");

      }

      // ⚠️ UNCLEAR
      else {

        setMessage(
          `AI verdict: ${data.verdict}`
        );

      }

    } catch (err) {

      console.error(
        "PROOF SUBMIT ERROR:",
        err.response?.data || err.message
      );

      setMessage(
        err.response?.data?.error ||
        "Proof submission failed"
      );

    } finally {

      setSubmitting(false);

    }
  };

  // 🔥 LOADING STATE
  if (loading) {
    return (
      <div className="loading-screen">
        Loading your mission...
      </div>
    );
  }

  // 🔥 NO TASK STATE
  if (!task) {
    return (
      <div className="no-task-container">
        <p>No active missions found.</p>

        <button
          className="create-btn"
          onClick={() => navigate("/create")}
        >
          Start New Task
        </button>
      </div>
    );
  }

  // 🔥 STATUS COLORS
  const statusColor = {
    done: "#22c55e",
    failed: "#ef4444",
    pending: "#f97316"
  }[task.status] || "#f97316";

  return (
    <div className="task-page">

      {/* HEADER */}
      <header className="task-header">

        <button
          className="back-btn"
          onClick={() => navigate("/")}
        >
          ← Back
        </button>

        <h1>YOUR MISSION</h1>

      </header>

      {/* TASK CARD */}
      <main className="task-card">

        {/* GOAL */}
        <div className="goal-section">

          <label>CURRENT GOAL</label>

          <h3>{task.goal}</h3>

        </div>

        {/* STATS */}
        <div className="stats-grid">

          <div className="stat-item">

            <span className="label">
              STATUS
            </span>

            <span
              className="value"
              style={{ color: statusColor }}
            >
              {task.status.toUpperCase()}
            </span>

          </div>

          <div className="stat-item">

            <span className="label">
              TIME REMAINING
            </span>

            <span
              className="value timer"
              style={{
                color:
                  timeLeft === "EXPIRED"
                    ? "#ef4444"
                    : "#fbbf24"
              }}
            >
              {timeLeft}
            </span>

          </div>

          <div className="stat-item">

            <span className="label">
              WITNESS
            </span>

            <span className="value">
              {task.witness?.name || "None Assigned"}
            </span>

          </div>

        </div>

        {/* PROOF SECTION */}
        <div className="proof-section">

          <h3>PROOF SUBMISSION</h3>

          <input
            type="text"
            placeholder="Paste proof image URL..."
            value={proofUrl}
            onChange={(e) =>
              setProofUrl(e.target.value)
            }
            className="proof-input"
          />

          <button
            className="submit-proof-btn"
            onClick={handleSubmitProof}
            disabled={submitting}
          >
            {submitting
              ? "Submitting..."
              : "Submit Proof →"}
          </button>

          {message && (
            <p className="proof-message">
              {message}
            </p>
          )}

        </div>

      </main>
    </div>
  );
};

export default Task;