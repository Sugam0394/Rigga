import { useEffect, useState } from "react";
import axios from "axios";

const API = "http://localhost:3000/api";
const PHONE = "+911234567890";

const Task = () => {
  const [task, setTask] = useState(null);
  const [loading, setLoading] = useState(true);
  const [timeLeft, setTimeLeft] = useState("");

  // 🔥 Fetch Task
  useEffect(() => {
    const fetchTask = async () => {
      try {
        const res = await axios.get(`${API}/${PHONE}/active`);

        const activeTask = res.data.activeTask;

        if (activeTask) {
          setTask(activeTask);
          localStorage.setItem("activeTaskBoxId", activeTask._id);
        } else {
          setTask(null);
        }
      } catch (err) {
        console.log("TASK ERROR:", err.response?.data || err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchTask();
  }, []);

  // 🔥 Countdown Timer
  useEffect(() => {
    if (!task) return;

    const interval = setInterval(() => {
      const now = new Date();
      const deadline = new Date(task.deadline);
      const diff = deadline - now;

      if (diff <= 0) {
        setTimeLeft("Time Over");
        return;
      }

      const h = Math.floor(diff / (1000 * 60 * 60));
      const m = Math.floor((diff / (1000 * 60)) % 60);
      const s = Math.floor((diff / 1000) % 60);

      setTimeLeft(`${h}h ${m}m ${s}s`);
    }, 1000);

    return () => clearInterval(interval);
  }, [task]);

  // 🔥 UI STATES
  if (loading) {
    return <p style={{ padding: "20px" }}>Loading task...</p>;
  }

  if (!task) {
    return (
      <div style={{ padding: "20px" }}>
        <p>No active task</p>
        <button onClick={() => (window.location.href = "/create")}>
          Create Task
        </button>
      </div>
    );
  }

  // 🔥 Status color
  const statusColor =
    task.status === "done"
      ? "green"
      : task.status === "failed"
      ? "red"
      : "orange";

  return (
    <div
      style={{
        background: "#000",
        color: "#fff",
        minHeight: "100vh",
        padding: "20px",
      }}
    >
      <h2 style={{ color: "#F97316" }}>YOUR COMMITMENT</h2>

      <div
        style={{
          border: "1px solid #333",
          padding: "20px",
          borderRadius: "10px",
          marginTop: "20px",
        }}
      >
        <h3>{task.goal}</h3>

        <p>
          <strong>Status:</strong>{" "}
          <span style={{ color: statusColor }}>{task.status}</span>
        </p>

        <p>
          <strong>Time Left:</strong>{" "}
          <span
            style={{
              color: timeLeft === "Time Over" ? "red" : "yellow",
            }}
          >
            {timeLeft}
          </span>
        </p>

        <p>
          <strong>Witness:</strong> {task.witness?.name || "N/A"}
        </p>

        <button
          style={{
            marginTop: "20px",
            background: "#F97316",
            color: "#fff",
            border: "none",
            padding: "10px 15px",
            cursor: "pointer",
          }}
          onClick={() => (window.location.href = "/proof")}
        >
          Submit Proof
        </button>
      </div>
    </div>
  );
};

export default Task;