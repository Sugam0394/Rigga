import { useEffect, useState } from "react";

import { useNavigate } from "react-router-dom";

import { motion } from "framer-motion";

import "./Landing.css";

import api from "../../Services/api";
import { useAuth } from "../../context/AuthContext";

 


const Landing = () => {

  const navigate = useNavigate();

  const { user, logout } = useAuth();


  const [activeTask, setActiveTask] = useState(null);

  const [stats, setStats] = useState(null);

  const [loading, setLoading] = useState(true);

  const [timeLeft, setTimeLeft] = useState("");


  // FETCH DASHBOARD DATA
  useEffect(() => {

    const fetchDashboard = async () => {

      try {

        console.log("FETCHING DASHBOARD...");

        const { data } = await api.get(
          `/tasks/${user.whatsappNumber}/active`
        );

        console.log("DASHBOARD RESPONSE:", data);

        setActiveTask(data.activeTask);

        setStats(data.stats);

      } catch (error) {

        console.log("DASHBOARD ERROR:", error);

      } finally {

        setLoading(false);

      }
    };

    if (user?.whatsappNumber) {
      fetchDashboard();
    }

  }, [user]);


  // LIVE TIMER
  useEffect(() => {

    if (!activeTask?.deadline) return;

    const interval = setInterval(() => {

      const now = new Date().getTime();

      const deadline = new Date(
        activeTask.deadline
      ).getTime();

      const distance = deadline - now;


      if (distance <= 0) {

        setTimeLeft("Time Over");

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

  }, [activeTask]);


  // LOGOUT
  const handleLogout = () => {

    logout();

    navigate("/login");
  };


  // LOADING
  if (loading) {
    return (
      <div className="landing-loading">
        Loading Dashboard...
      </div>
    );
  }


  return (
    <div className="landing-page">

      {/* TOP BAR */}

      <div className="top-bar">

        <h1>Rigga</h1>

        <div className="top-right">

          <span>
            {user?.whatsappNumber}
          </span>

          <button onClick={handleLogout}>
            Logout
          </button>

        </div>

      </div>


      {/* MAIN CONTENT */}

      <motion.div
        className="dashboard-card"

        initial={{ opacity: 0, y: 40 }}

        animate={{ opacity: 1, y: 0 }}

        transition={{ duration: 0.5 }}
      >

        {/* ACTIVE TASK */}

        {activeTask ? (

          <>

            <h2>
              🔥 Active Challenge
            </h2>

            <h3>
              {activeTask.goal}
            </h3>


            <div className="timer-box">
              ⏱ {timeLeft}
            </div>


            <p>
              Witness:
              {" "}
              {activeTask.witness?.name}
            </p>


            <div className="action-buttons">

              <button
                onClick={() => navigate("/task")}
              >
                Proof Submit
              </button>


              <button
                onClick={() => navigate("/chat")}
              >
                Chat
              </button>

            </div>

          </>

        ) : (

          // NO TASK STATE

          <div className="no-task">

            <h2>
              No challenge running 🚀
            </h2>

            <p>
              Start your first discipline mission.
            </p>

            <button
              onClick={() => navigate("/create")}
            >
              Create Challenge
            </button>

          </div>

        )}

      </motion.div>


      {/* STATS */}

      <div className="stats-grid">

        <div className="stat-card">
          🔥 Streak
          <h2>
            {stats?.currentStreak || 0}
          </h2>
        </div>

        <div className="stat-card">
          ✅ Wins
          <h2>
            {stats?.totalWins || 0}
          </h2>
        </div>

        <div className="stat-card">
          💀 Fails
          <h2>
            {stats?.totalFails || 0}
          </h2>
        </div>

      </div>

    </div>
  );
};

export default Landing;