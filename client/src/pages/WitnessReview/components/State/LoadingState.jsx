 const LoadingState = () => {
  return (
    <div
      style={{
        minHeight: "60vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        textAlign: "center",
        padding: "24px",
      }}
    >
      <div
        style={{
          width: "48px",
          height: "48px",
          border: "4px solid #dbeafe",
          borderTop: "4px solid #2563eb",
          borderRadius: "50%",
          marginBottom: "20px",
        }}
      />

      <h2
        style={{
          margin: "0 0 12px",
          color: "#0f172a",
          fontSize: "1.5rem",
          fontWeight: "700",
        }}
      >
        Loading Invitation
      </h2>

      <p
        style={{
          margin: 0,
          maxWidth: "420px",
          color: "#475569",
          lineHeight: "1.6",
        }}
      >
        Please wait while we securely load your
        invitation.
      </p>
    </div>
  );
};

export default LoadingState;