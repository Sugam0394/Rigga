 import { useLocation } from "react-router-dom";
import { useState } from "react";
import { completeProfile } from "../../services/authService";
import useAuth from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";


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
    <div>
      <h1>
        Complete Your Profile
      </h1>

      <p>
        {verifiedPhone}
      </p>

      <input
        type="text"
        placeholder="Name"
        value={name}
        onChange={(e) =>
          setName(
            e.target.value
          )
        }
      />

      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) =>
          setEmail(
            e.target.value
          )
        }
      />

      {error && (
        <p>{error}</p>
      )}

       <button
  onClick={
    handleSubmit
  }
  disabled={loading}
>
  {loading
    ? "Creating..."
    : "Continue"}
</button>
    </div>
  );
};

export default CreateProfilePage;