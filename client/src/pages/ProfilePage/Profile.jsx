 import {  useState } from "react";
import { useNavigate } from "react-router-dom";

import useAuth from "../../context/AuthContext";

import useProfile from "./hooks/useProfile";

import ProfileHeader from "./components/ProfileHeader";
import AccountabilityRecord from "./components/AccountabilityRecord";
import VerificationRecord from "./components/VerificationRecord";
import ProfileInfoCard from "./components/ProfileInfoCard";
import LogoutCard from "./components/LogoutCard";
import AboutCard from "./components/AboutCard";
 import ProfileActions from "./components/ProfileActions";

import useUpdateProfile from "./hooks/useUpdateProfile";
import ProfileEditForm from "./ProfileEditForm";


import "./Profile.css"

function Profile() {
 const {
  profile,
  loading,
  error,
  refreshProfile,
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

  const [isEditing, setIsEditing] =
  useState(false);

 const [formData, setFormData] =
  useState({
    name: "",
    username: "",
    bio: "",
    phone: "",
    email: "",
    timezone: "",
    language: "",
    avatarUrl: "",
  });

  const handleOpenSettings = () => {
  navigate("/settings");
};

const {
  update,
  loading: saving,
  error: updateError,
  success,
} = useUpdateProfile();

const handleSave = async () => {
  try {
    await update(formData);

    await refreshProfile();

    setIsEditing(false);
  } catch {
    // Error UI already comes
    // from useUpdateProfile.
  }
};

const handleOpenHistory = () => {
  navigate("/history");
};


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

 

 const handleEdit = () => {
  if (!profile) return;

  setFormData({
    name: profile.name || "",
    username: profile.username || "",
    bio: profile.bio || "",
    phone: profile.phone || "",
    email: profile.email || "",
    timezone: profile.timezone || "",
    language: profile.language || "",
    avatarUrl: profile.avatarUrl || "",
  });

  setIsEditing(true);
};

const handleCancel = () => {
  setIsEditing(false);

  if (!profile) return;

   setFormData({
  name: profile.name || "",
  username: profile.username || "",
  bio: profile.bio || "",
  phone: profile.phone || "",
  email: profile.email || "",
  timezone: profile.timezone || "",
  language: profile.language || "",
  avatarUrl: profile.avatarUrl || "",
});
};

const handleChange = (
  event
) => {
  const {
    name,
    value,
  } = event.target;

  setFormData(
    (previous) => ({
      ...previous,
      [name]: value,
    })
  );
};

const hasChanges =
  profile &&
  (
    formData.name !== profile.name ||
    formData.username !==
      (profile.username || "") ||
    formData.bio !==
      (profile.bio || "") ||
    formData.phone !==
      (profile.phone || "") ||
    formData.timezone !==
      (profile.timezone || "") ||
    formData.language !==
      (profile.language || "") ||
    formData.avatarUrl !==
      (profile.avatarUrl || "")
  );

 if (loading) {
  return (
    <main className="profile-page">
      <div className="profile-page__loading">
        Loading profile...
      </div>
    </main>
  );
}

if (error) {
  return (
    <main className="profile-page">
      <div className="profile-page__error">
        {error}
      </div>
    </main>
  );
}

if (!profile) {
  return (
    <main className="profile-page">
      <div className="profile-page__empty">
        Unable to load profile.
      </div>
    </main>
  );
}

 

  return (
  <div className="profile-page">
       <ProfileHeader
  profile={profile}
/>

   {success && (
      <p className="profile-page__success">
        Profile updated successfully.
      </p>
    )}

  <ProfileActions
  isEditing={isEditing}
  onEdit={handleEdit}
  onSettings={handleOpenSettings}
  onHistory={handleOpenHistory}
/>

    {isEditing ? (
  <ProfileEditForm
    formData={formData}
    onChange={handleChange}
    onSave={handleSave}
    onCancel={handleCancel}
    saving={saving}
    hasChanges={hasChanges}
    error={updateError}
  />
) : (
  <>
    <ProfileInfoCard
      profile={profile}
    />

    <AboutCard
      bio={profile.bio}
    />
  </>
)}

<AccountabilityRecord />

<VerificationRecord />

   

 

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