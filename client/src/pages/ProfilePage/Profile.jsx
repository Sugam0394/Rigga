 import useProfile from "./hooks/useProfile";
import ProfileInfoCard from "./components/ProfileInfoCard";
import ProfileHeader from "./components/ProfileHeader";
import ProfileStatsCard from "./components/ProfileStatsCard";


import { useState } from "react";
import { useNavigate } from "react-router-dom";

import useAuth from "../../context/AuthContext";
import LogoutCard from "./components/LogoutCard";


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

const [logoutLoading,
  setLogoutLoading] =
  useState(false);

  const handleLogout =
  async () => {
    try {
      setLogoutLoading(
        true
      );

      await logout();

      navigate(
        "/login",
        {
          replace: true,
        }
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
    return null;
  }

  return (
    <div>
      <ProfileHeader
  name={profile.name}
/>
      <ProfileInfoCard
        profile={profile}
      />
      <ProfileStatsCard />
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