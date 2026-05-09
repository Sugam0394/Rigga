import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

import "./Login.css";

import api from "../../services/api";

import { useAuth } from "../../context/AuthContext";


const Login = () => {

  const navigate = useNavigate();

  const { login } = useAuth();


  const [formData, setFormData] = useState({
    whatsappNumber: "",
    password: "",
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


 
 // HANDLE LOGIN
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      setError("");

      console.log("LOGIN FORM DATA:", formData);

      // API CALL - Yahan badlav kiya gaya hai
      // Backend expects 'phone', but our state is 'whatsappNumber'
      const { data } = await api.post("/login", {
        phone: formData.whatsappNumber, // mapping whatsappNumber to phone
        password: formData.password,
      });

      console.log("LOGIN RESPONSE:", data);

      // SAVE TOKEN + USER
      login(data.token, data.user);

      console.log("USER LOGGED IN");

      // REDIRECT
      navigate("/");

    } catch (error) {
      console.log("LOGIN ERROR:", error);
      setError(
        error.response?.data?.message || "Login failed"
      );
    } finally {
      setLoading(false);
    }
  };


  return (
    <div className="login-page">

      <div className="login-card">

        <h1>Rigga</h1>

        <p className="subtitle">
          Discipline starts today 🔥
        </p>


        <form onSubmit={handleSubmit}>

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
            {loading ? "Logging in..." : "Login"}
          </button>

        </form>


        <p className="bottom-text">
          New user?
          <Link to="/register">
            Register
          </Link>
        </p>

      </div>

    </div>
  );
};

export default Login;