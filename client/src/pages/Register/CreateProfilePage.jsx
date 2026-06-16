 import { useLocation } from "react-router-dom";
import { useState } from "react";
import { completeProfile } from "../../services/authService";
import useAuth from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import "./CreateProfilePage.css"
import CreateProfileHero from "./CreateProfileHero";
import AuthError from "../../features/auth/components/AuthError"
import AuthSubmitButton from "../../features/auth/components/AuthSubmitButton"





const CreateProfilePage = () => {

    const { restoreSession } =
  useAuth();
  const location =
    useLocation();
    const navigate =
  useNavigate();

  const verifiedPhone =
    location.state
      ?.verifiedPhone;

  const [name, setName] =
    useState("");

  const [email, setEmail] =
    useState("");

  const [error, setError] =
    useState("");

    const [loading, setLoading] =
  useState(false);



const handleSubmit = async () => {
  try {
    setLoading(true);
    setError("");

   await completeProfile({
  name,
  email,
  phone:
    verifiedPhone,
});

await restoreSession();

navigate("/home", {
  replace: true,
});
  } catch (error) {
    setError(
      error?.response?.data
        ?.message ||
        "Unable to complete profile"
    );
  } finally {
    setLoading(false);
  }
};
  return (
  <div className="profile-page">
    <CreateProfileHero
      verifiedPhone={
        verifiedPhone
      }
    />

    <input
      type="text"
      placeholder="Full Name"
      value={name}
      onChange={(e) =>
        setName(
          e.target.value
        )
      }
      className="profile-input"
    />

    <input
      type="email"
      placeholder="Email Address"
      value={email}
      onChange={(e) =>
        setEmail(
          e.target.value
        )
      }
      className="profile-input"
    />

    <AuthError
      id="profile-error"
      message={error}
    />

    <div className="profile-submit-wrapper">
      <AuthSubmitButton
        disabled={loading}
        onClick={
          handleSubmit
        }
      >
        {loading
          ? "Creating Profile..."
          : "Continue"}
      </AuthSubmitButton>
    </div>
  </div>
);
};

export default CreateProfilePage;