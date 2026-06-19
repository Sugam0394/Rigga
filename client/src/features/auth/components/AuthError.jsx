 const AuthError = ({ message, id }) => {
  if (!message) return null;

  return (
    <p
      id={id}
      aria-live="polite"
      style={{
        color: "#DC2626",
        fontSize: "14px",
      }}
    >
      {message}
    </p>
  );
};

export default AuthError;