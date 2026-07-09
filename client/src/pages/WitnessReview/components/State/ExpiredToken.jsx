 const ExpiredTokenState = () => {
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
          border: "1px solid #fde68a",
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
            color: "#92400e",
            fontSize: "1.6rem",
            fontWeight: "700",
          }}
        >
          Invitation Expired
        </h2>

        <p
          style={{
            margin: "0 0 20px",
            color: "#475569",
            lineHeight: "1.7",
          }}
        >
          This invitation is no longer valid and
          cannot be used to review the challenge.
        </p>

        <p
          style={{
            margin: 0,
            color: "#64748b",
            fontSize: "0.95rem",
          }}
        >
          Please ask the challenge creator to send
          you a new invitation if you still wish to
          help.
        </p>
      </div>
    </div>
  );
};

export default ExpiredTokenState;