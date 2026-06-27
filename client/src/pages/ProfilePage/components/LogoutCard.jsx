 import "./LogoutCard.css";

const LogoutCard = ({
  onLogout,
  loading,
}) => {
  return (
    <section className="logout-card">
      <h2>
        Sign Out
      </h2>

      <p>
        End your current
        Rigga session
        securely.
      </p>

      <button
        type="button"
        onClick={onLogout}
        disabled={loading}
        className="logout-card__button"
      >
        {loading
          ? "Signing Out..."
          : "Logout"}
      </button>
    </section>
  );
};

export default LogoutCard;