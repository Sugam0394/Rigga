 import "./LogoutCard.css";

const LogoutCard = ({
  onLogout,
  loading,
}) => {
  return (
    <section className="logout-card">
      <h2>
        Account
      </h2>

      <p>
        Sign out of your
        Rigga account.
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