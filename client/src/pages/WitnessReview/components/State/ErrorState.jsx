 const ErrorState = ({
  message,
}) => {
  return (
    <div
      style={{
        minHeight: "60vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: "24px",
      }}
    >
      <div
        style={{
          maxWidth: "520px",
          width: "100%",
          background: "#ffffff",
          border: "1px solid #fecaca",
          borderRadius: "16px",
          padding: "32px",
          textAlign: "center",
          boxShadow:
            "0 10px 24px rgba(15,23,42,0.08)",
        }}
      >
        <h2
          style={{
            margin: "0 0 16px",
            color: "#b91c1c",
            fontSize: "1.6rem",
            fontWeight: "700",
          }}
        >
          Unable to Load Invitation
        </h2>

        <p
          style={{
            margin: "0 0 20px",
            color: "#475569",
            lineHeight: "1.7",
          }}
        >
          {message}
        </p>

        <p
          style={{
            margin: 0,
            color: "#64748b",
            fontSize: "0.95rem",
          }}
        >
          Please check your invitation link or
          contact the challenge creator if the
          problem continues.
        </p>
      </div>
    </div>
  );
};

export default ErrorState;