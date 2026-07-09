 const AlreadyReviewedState = () => {
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
          border: "1px solid #bbf7d0",
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
            color: "#166534",
            fontSize: "1.6rem",
            fontWeight: "700",
          }}
        >
          Review Already Submitted
        </h2>

        <p
          style={{
            margin: "0 0 20px",
            color: "#475569",
            lineHeight: "1.7",
          }}
        >
          Your review has already been recorded.
          Thank you for helping maintain accountability.
        </p>

        <p
          style={{
            margin: 0,
            color: "#64748b",
            fontSize: "0.95rem",
          }}
        >
          No further action is required. The challenge
          creator will receive your decision through the
          Rigga review process.
        </p>
      </div>
    </div>
  );
};

export default AlreadyReviewedState;