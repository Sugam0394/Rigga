import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import api from "../../services/api";
import "./CreateTask.css";

const CreateTask = () => {

  const location = useLocation();
  const navigate = useNavigate();

  // 🔥 challenge data
  const challengeData = location.state || {};

  const [formData, setFormData] = useState({

    goal:
      challengeData.challengeTitle || "",

    stakeType:
      challengeData.stakeType || "photo",

    stakeUrl: "",

    deadline: "",

    witnessName: "",

    witnessPhone: ""

  });

  const [loading, setLoading] =
    useState(false);

  useEffect(() => {

    console.log(
      "Challenge Data:",
      challengeData
    );

  }, [challengeData]);

  // 🔥 input handler
  const handleChange = (e) => {

    setFormData({
      ...formData,

      [e.target.name]:
        e.target.value
    });

  };

  // 🔥 submit task
  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      setLoading(true);

      // ✅ payload
      const payload = {

        goal: formData.goal,

        stakeType:
          formData.stakeType,

        stakeUrl:
          formData.stakeUrl || "pending",

        deadline:
          formData.deadline,

        witness: {

          name:
            formData.witnessName ||
            "Witness",

          phone:
            formData.witnessPhone

        }

      };

      // ✅ create task
      const res = await api.post(
        "/create",
        payload
      );

      // ✅ success
      if (res.data.success) {

        alert(
          "Challenge Accepted! Rigga is watching you."
        );

        navigate("/task");

      }

    } catch (err) {

      console.error(
        "CREATE TASK ERROR:",
        err.response?.data ||
        err.message
      );

      alert(
        err.response?.data?.error ||
        "Failed to create task"
      );

    } finally {

      setLoading(false);

    }
  };

  return (
    <div className="create-task-page">

      <div className="create-task-container">

        <h1>Finalize Challenge</h1>

        {/* 🔥 Challenge Preview */}
        {challengeData.challengeTitle && (

          <div className="challenge-ref-box">

            <p>
              <strong>Challenge:</strong>
              {" "}
              {challengeData.challengeTitle}
            </p>

            <p>
              <strong>Consequence:</strong>
              {" "}
              {challengeData.consequence}
            </p>

          </div>

        )}

        {/* 🔥 FORM */}
        <form onSubmit={handleSubmit}>

          {/* GOAL */}
          <div className="form-group">

            <label>
              Task Goal
            </label>

            <input
              type="text"
              name="goal"
              value={formData.goal}
              onChange={handleChange}
              placeholder="e.g. 20 Pushups"
              required

              readOnly={
                !!challengeData.challengeTitle
              }
            />

          </div>

          {/* DEADLINE */}
          <div className="form-group">

            <label>
              Target Deadline
            </label>

            <input
              type="datetime-local"
              name="deadline"
              value={formData.deadline}
              onChange={handleChange}
              required
            />

          </div>

          {/* WITNESS */}
          <div
            className="witness-section"
            style={{
              marginTop: "20px",
              borderTop: "1px solid #333",
              paddingTop: "20px"
            }}
          >

            <h3>
              Witness Details
            </h3>

            {/* witness name */}
            <div className="form-group">

              <label>
                Witness Name
              </label>

              <input
                type="text"
                name="witnessName"
                value={formData.witnessName}
                onChange={handleChange}
                placeholder="Friend's Name"
                required
              />

            </div>

            {/* witness phone */}
            <div className="form-group">

              <label>
                Witness WhatsApp Number
              </label>

              <input
                type="text"
                name="witnessPhone"
                value={formData.witnessPhone}
                onChange={handleChange}
                placeholder="e.g. 917777777777"
                required
              />

            </div>

          </div>

          {/* SUBMIT */}
          <button
            type="submit"
            className="submit-btn"
            disabled={loading}
          >

            {loading
              ? "Creating Task..."
              : "I Swear, I'll Do It →"}

          </button>

        </form>

        {/* CANCEL */}
        <button
          className="back-link-btn"

          onClick={() => navigate(-1)}

          style={{
            background: "none",
            border: "none",
            color: "#666",
            marginTop: "15px",
            cursor: "pointer",
            width: "100%"
          }}
        >
          Cancel
        </button>

      </div>
    </div>
  );
};

export default CreateTask;