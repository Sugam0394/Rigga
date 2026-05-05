import { useState } from "react";
import axios from "axios";

const API = "http://localhost:3000/api";
const PHONE = "911234567890";

const CreateTask = () => {
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    goal: "",
    deadline: "",
    stakeType: "photo",
    witnessName: "",
    witnessPhone: "",
    consent: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.goal || !formData.deadline || !formData.witnessPhone) {
      return alert("Fill all required fields");
    }

    if (!formData.consent) {
      return alert("Accept consent");
    }

    setLoading(true);

    try {
      const payload = {
        phone: PHONE,
        goal: formData.goal,
        deadline: new Date(formData.deadline).toISOString(), // 🔥 FIX
        stakeType: formData.stakeType,
        stakeUrl: "pending",
        witness: {
          name: formData.witnessName || "Witness",
          phone: formData.witnessPhone,
        },
      };

      const res = await axios.post(`${API}/create`, payload);

      if (res.data.success) {
        window.location.href = "/task";
      }

    } catch (err) {
      console.log("ERROR:", err.response?.data || err.message);

      // 🔥 DUPLICATE TASK HANDLE
      if (err.response?.data?.error?.includes("Focus on your current task")) {
        alert("You already have an active task");
        window.location.href = "/task";
      } else {
        alert("Something went wrong");
      }

    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>Create Task</h2>

      <form onSubmit={handleSubmit}>
        <input name="goal" placeholder="Goal" onChange={handleChange} />
        <br /><br />

        <input type="datetime-local" name="deadline" onChange={handleChange} />
        <br /><br />

        <select name="stakeType" onChange={handleChange}>
          <option value="photo">Photo</option>
          <option value="text">Text</option>
          <option value="money">Money</option>
        </select>

        <br /><br />

        <input name="witnessPhone" placeholder="Witness Phone" onChange={handleChange} />
        <br /><br />

        <input name="witnessName" placeholder="Witness Name" onChange={handleChange} />
        <br /><br />

        <label>
          <input type="checkbox" name="consent" onChange={handleChange} />
          I agree to consequences
        </label>

        <br /><br />

        <button disabled={loading}>
          {loading ? "Creating..." : "Create"}
        </button>
      </form>
    </div>
  );
};

export default CreateTask;