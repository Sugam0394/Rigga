 import { useState } from "react";

import { Link, useNavigate } from "react-router-dom";

import "./Register.css";

import api from "../../services/api";


 import { useAuth } from "../../context/AuthContext";


const Register = () => {

  const navigate = useNavigate();

  const { login } = useAuth();


  const [formData, setFormData] = useState({
    whatsappNumber: "",
    password: "",
    name: "",
  });


  const [loading, setLoading] = useState(false);

  const [error, setError] = useState("");


  // HANDLE INPUT
  const handleChange = (e) => {

    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });

  };


  
 // HANDLE REGISTER
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      setError("");

      console.log("REGISTER FORM:", formData);

      // API CALL
      const { data } = await api.post("/register", {
        name: formData.name,
        phone: formData.whatsappNumber, // Backend expects 'phone'
        password: formData.password,
      });

      console.log("REGISTER RESPONSE:", data);

      // AUTO LOGIN
      login(data.token, data.user);
      console.log("REGISTER SUCCESS");

      // REDIRECT
      navigate("/");

    } catch (error) {
      console.log("REGISTER ERROR:", error);
      setError(
        error.response?.data?.message || "Register failed"
      );
    } finally {
      setLoading(false);
    }
  };


  return (
    <div className="register-page">

      <div className="register-card">

        <h1>Rigga</h1>

        <p className="subtitle">
          Start your discipline journey 🔥
        </p>


        <form onSubmit={handleSubmit}>

          <input
            type="text"
            name="name"
            placeholder="Your Name"
            value={formData.name}
            onChange={handleChange}
          />


          <input
            type="text"
            name="whatsappNumber"
            placeholder="WhatsApp Number"
            value={formData.whatsappNumber}
            onChange={handleChange}
            required
          />


          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required
          />


          {error && (
            <p className="error-text">
              {error}
            </p>
          )}


          <button
            type="submit"
            disabled={loading}
          >
            {loading
              ? "Creating account..."
              : "Register"}
          </button>

        </form>


        <p className="bottom-text">
          Already have an account?
          <Link to="/login">
            Login
          </Link>
        </p>

      </div>

    </div>
  );
};

export default Register;