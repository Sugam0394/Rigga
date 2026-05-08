import { useEffect, useState } from "react";
import axios from "axios";

const API = "http://localhost:3000/api";
const PHONE = "+911234567890";

const History = () => {
  const [tasks, setTasks] = useState([]);
  const [stats, setStats] = useState(null);

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const res = await axios.get(`${API}/${PHONE}/history`);

        setTasks(res.data.taskBoxes);
        setStats(res.data.user);
      } catch (err) {
        console.log("HISTORY ERROR:", err.response?.data || err.message);
      }
    };

    fetchHistory();
  }, []);

  return (
    <div style={{ background: "#000", color: "#fff", minHeight: "100vh", padding: "20px" }}>
      <h2 style={{ color: "#F97316" }}>HISTORY</h2>

      {/* 🔥 Stats */}
      {stats && (
        <div style={{ marginBottom: "20px" }}>
          <p>✅ Completed: {stats.completed}</p>
          <p>❌ Failed: {stats.failed}</p>
          <p>🔥 Streak: {stats.currentStreak}</p>
        </div>
      )}

      {/* 🔥 Task List */}
      {tasks.map((task) => (
        <div
          key={task._id}
          style={{
            borderLeft: `4px solid ${
              task.status === "done"
                ? "green"
                : task.status === "failed"
                ? "red"
                : "orange"
            }`,
            padding: "10px",
            marginBottom: "10px",
            background: "#111",
          }}
        >
          <p>{task.goal}</p>
          <small>{new Date(task.createdAt).toLocaleString()}</small>
        </div>
      ))}
    </div>
  );
};

export default History;