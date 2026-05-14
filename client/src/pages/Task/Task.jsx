import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../services/api";
import "./Task.css";

const PHONE = "+911234567890"; // In a real app, get this from your Auth context or LocalStorage

const Task = () => {
  const [task, setTask] = useState(null);
  const [loading, setLoading] = useState(true);
  const [timeLeft, setTimeLeft] = useState("");
  const navigate = useNavigate();

  // 🔥 Fetch Task
  useEffect(() => {
    const fetchTask = async () => {
      try {
        // We use encodeURIComponent because the '+' in phone numbers breaks URLs
        const res = await api.get(`/active/${encodeURIComponent(PHONE)}`);
        
        if (res.data.activeTask) {
          setTask(res.data.activeTask);
          localStorage.setItem("activeTaskBoxId", res.data.activeTask._id);
        } else {
          setTask(null);
        }
      } catch (err) {
        console.error("TASK FETCH ERROR:", err.response?.data || err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchTask();
  }, []);

  // 🔥 Countdown Timer
  useEffect(() => {
    if (!task || !task.deadline) return;

    const interval = setInterval(() => {
      const now = new Date();
      const deadline = new Date(task.deadline);
      const diff = deadline - now;

      if (diff <= 0) {
        setTimeLeft("EXPIRED");
        clearInterval(interval);
        return;
      }

      const h = Math.floor(diff / (1000 * 60 * 60));
      const m = Math.floor((diff / (1000 * 60)) % 60);
      const s = Math.floor((diff / 1000) % 60);

      setTimeLeft(`${h}h ${m}m ${s}s`);
    }, 1000);

    return () => clearInterval(interval);
  }, [task]);

  if (loading) return <div className="loading-screen">Loading your mission...</div>;

  if (!task) {
    return (
      <div className="no-task-container">
        <p>No active missions found.</p>
        <button className="create-btn" onClick={() => navigate("/create")}>
          Start New Task
        </button>
      </div>
    );
  }

  const statusColor = {
    done: "#22c55e",   // Green
    failed: "#ef4444", // Red
    pending: "#f97316" // Orange
  }[task.status] || "#f97316";

  return (
    <div className="task-page">
      <header className="task-header">
        <h1>YOUR COMMITMENT</h1>
      </header>

      <main className="task-card">
        <div className="goal-section">
          <label>CURRENT GOAL</label>
          <h3>{task.goal}</h3>
        </div>

        <div className="stats-grid">
          <div className="stat-item">
            <span className="label">STATUS</span>
            <span className="value" style={{ color: statusColor }}>
              {task.status.toUpperCase()}
            </span>
          </div>

          <div className="stat-item">
            <span className="label">TIME REMAINING</span>
            <span className="value timer" style={{ color: timeLeft === "EXPIRED" ? "#ef4444" : "#fbbf24" }}>
              {timeLeft}
            </span>
          </div>

          <div className="stat-item">
            <span className="label">WITNESS</span>
            <span className="value">{task.witness?.name || "None Assigned"}</span>
          </div>
        </div>

        <button className="submit-proof-btn" onClick={() => navigate("/proof")}>
          SUBMIT PROOF
        </button>
      </main>
    </div>
  );
};

export default Task;