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

  const isFormValid =
    name.trim() &&
    email.trim();

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

      <label className="profile-label">
        Full Name
      </label>

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

      <p className="profile-helper">
        Used to identify you across
        your commitments and witness
        reviews.
      </p>

      <label className="profile-label">
        Email Address
      </label>

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

      <p className="profile-helper">
        Used for account security and
        important account updates.
      </p>

      <AuthError
        id="profile-error"
        message={error}
      />

      <div className="profile-submit-wrapper">
        <AuthSubmitButton
          disabled={
            !isFormValid ||
            loading
          }
          onClick={
            handleSubmit
          }
        >
          {loading
            ? "Setting Up Account..."
            : "Complete Profile"}
        </AuthSubmitButton>
      </div>
    </div>
  );
};

export default CreateProfilePage;