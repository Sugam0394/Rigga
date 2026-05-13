import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import "./Landing.css";
import api from "../../services/api";
import { useAuth } from "../../context/AuthContext";

const Landing = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const [activeTask, setActiveTask] = useState(null);
  const [stats, setStats] = useState({
    totalWins: 0,
    totalFails: 0,
    currentStreak: 0,
  });
  const [loading, setLoading] = useState(true);
  const [timeLeft, setTimeLeft] = useState("");

  // FETCH DASHBOARD DATA
  // Memoization errors se bachne ke liye logic seedha useEffect mein rakhein
  useEffect(() => {
    // Variable to prevent state updates if component unmounts
    let isMounted = true;

    const fetchDashboard = async () => {
      if (!user?.whatsappNumber) {
        setLoading(false);
        return;
      }

      try {
        console.log("FETCHING DASHBOARD FOR:", user.whatsappNumber);
        const { data } = await api.get(`/active`);

        if (isMounted) {
          console.log("DASHBOARD RESPONSE:", data);
          setActiveTask(data.activeTask || null);
          if (data.stats) setStats(data.stats);
        }
      } catch (error) {
        console.log("DASHBOARD ERROR:", error.response?.data || error.message);
        if (isMounted) setActiveTask(null);
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    fetchDashboard();

    return () => {
      isMounted = false;
    };
    // Dependency mein pura 'user' object dein taaki compiler optimize kar sake
  }, [user]); 

  // LIVE TIMER
  useEffect(() => {
    if (!activeTask?.deadline) return;

    const interval = setInterval(() => {
      const now = new Date().getTime();
      const deadline = new Date(activeTask.deadline).getTime();
      const distance = deadline - now;

      if (distance <= 0) {
        setTimeLeft("Time Over");
        clearInterval(interval);
        return;
      }

      const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((distance % (1000 * 60)) / 1000);

      setTimeLeft(`${hours}h ${minutes}m ${seconds}s`);
    }, 1000);

    return () => clearInterval(interval);
  }, [activeTask]);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  if (loading) {
    return <div className="landing-loading">Loading Dashboard...</div>;
  }

  return (
    <div className="landing-page">
      {/* TOP BAR */}
      <div className="top-bar">
        <h1>Rigga</h1>
        <div className="top-right">
          <span>{user?.whatsappNumber}</span>
          <button onClick={handleLogout}>Logout</button>
        </div>
      </div>

      {/* DASHBOARD CARD */}
      <motion.div 
        className="dashboard-card"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        {activeTask ? (
          <>
            <h2>🔥 Active Challenge</h2>
            <h3>{activeTask.goal}</h3>
            <div className="timer-box">⏱ {timeLeft}</div>
            <div className="action-buttons">
              <button onClick={() => navigate("/task")}>Proof Submit</button>
              <button onClick={() => navigate("/chat")}>Chat</button>
            </div>
          </>
        ) : (
          <div className="no-task">
            <h2>No challenge running 🚀</h2>
            <button onClick={() => navigate("/create")}>Create Challenge</button>
          </div>
        )}
      </motion.div>

      {/* STATS GRID */}
      <div className="stats-grid">
        <div className="stat-card">🔥 Streak <h2>{stats.currentStreak}</h2></div>
        <div className="stat-card">✅ Wins <h2>{stats.totalWins}</h2></div>
        <div className="stat-card">💀 Fails <h2>{stats.totalFails}</h2></div>
      </div>
    </div>
  );
};

export default Landing;