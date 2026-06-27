 import { useState } from "react";
import { useNavigate } from "react-router-dom";

import useAuth from "../../context/AuthContext";

import useProfile from "./hooks/useProfile";

import ProfileHeader from "./components/ProfileHeader";
import AccountabilityRecord from "./components/AccountabilityRecord";
import VerificationRecord from "./components/VerificationRecord";
import ProfileInfoCard from "./components/ProfileInfoCard";
import LogoutCard from "./components/LogoutCard";


import "./Profile.css"

function Profile() {
  const {
    profile,
    loading,
    error,
  } = useProfile();

  const navigate =
    useNavigate();

  const { logout } =
    useAuth();

  const [
    logoutLoading,
    setLogoutLoading,
  ] = useState(false);

  const [
    logoutError,
    setLogoutError,
  ] = useState("");

  const handleLogout =
    async () => {
      try {
        setLogoutLoading(
          true
        );

        setLogoutError(
          ""
        );

        await logout();

        navigate(
          "/login",
          {
            replace: true,
          }
        );
      } catch {
        setLogoutError(
          "Unable to sign out. Please try again."
        );
      } finally {
        setLogoutLoading(
          false
        );
      }
    };

  if (loading) {
    return (
      <p>
        Loading profile...
      </p>
    );
  }

  if (error) {
    return (
      <p>{error}</p>
    );
  }

  if (!profile) {
    return (
      <p>
        Unable to load
        profile.
      </p>
    );
  }

  return (
  <div className="profile-page">
      <ProfileHeader
        name={profile.name}
        memberSince={
          profile.createdAt
        }
      />

      <AccountabilityRecord />

      <VerificationRecord />

      <ProfileInfoCard
        profile={profile}
      />

      {logoutError && (
  <p className="profile-page__error">
    {logoutError}
  </p>
)}

      <LogoutCard
        onLogout={
          handleLogout
        }
        loading={
          logoutLoading
        }
      />
    </div>
  );
}

export default Profile;