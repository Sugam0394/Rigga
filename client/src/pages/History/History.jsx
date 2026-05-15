import {
  useEffect,
  useState,
} from "react";
import { useNavigate } from "react-router-dom";

import api from "../../services/api";

import "./History.css";

const History = () => {

  const navigate = useNavigate();

  const [tasks, setTasks] =
    useState([]);

  const [stats, setStats] =
    useState(null);

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState("");

  useEffect(() => {

    const fetchHistory =
      async () => {
        try {

          setLoading(true);

          const { data } =
            await api.get(
              "/tasks/history"
            );

          setTasks(
            data.taskBoxes || []
          );

          setStats(
            data.user || null
          );

        } catch (err) {

          console.log(err);

          setError(
            "History load failed 💀"
          );

        } finally {

          setLoading(false);
        }
      };

    fetchHistory();

  }, []);

  // LOADING
  if (loading) {
    return (
      <div className="history-page">
        <h2>
          Loading history...
        </h2>
      </div>
    );
  }

  // ERROR
  if (error) {
    return (
      <div className="history-page">
        <h2>{error}</h2>
      </div>
    );
  }

  return (
    <div className="history-page">

      <div className="history-header">

  <button
    className="back-btn"
    onClick={() => navigate(-1)}
  >
    ← Back
  </button>

  <h1>History 📋</h1>

</div>

      {/* STATS */}
      {stats && (
        <div className="stats-bar">

          <div className="stat-box">
            🔥
            <span>
              {stats.currentStreak}
            </span>
            <p>Streak</p>
          </div>

          <div className="stat-box">
            ✅
            <span>
              {stats.completed}
            </span>
            <p>Wins</p>
          </div>

          <div className="stat-box">
            💀
            <span>
              {stats.failed}
            </span>
            <p>Fails</p>
          </div>

        </div>
      )}

      {/* EMPTY */}
      {tasks.length === 0 ? (
        <div className="empty-state">
          Abhi tak koi task nahi 😴
        </div>
      ) : (

        <div className="history-list">

          {tasks.map((task) => {

            let statusEmoji = "⏳";
            let statusClass = "pending";

            if (
              task.status === "done"
            ) {
              statusEmoji = "✅";
              statusClass = "done";
            }

            if (
              task.status ===
              "failed"
            ) {
              statusEmoji = "💀";
              statusClass = "failed";
            }

            return (
              <div
                key={task._id}
                className={`history-card ${statusClass}`}
              >

                <div className="history-top">

                  <h3>
                    {task.goal}
                  </h3>

                  <span>
                    {statusEmoji}
                  </span>

                </div>

                <div className="history-bottom">

                  <p>
                    {task.status}
                  </p>

                  <small>
                    {new Date(
                      task.createdAt
                    ).toLocaleDateString()}
                  </small>

                </div>

              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default History;