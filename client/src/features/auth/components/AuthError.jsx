



const AuthError = ({ message }) => {
  if (!message) return null;

  return (
    <p
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