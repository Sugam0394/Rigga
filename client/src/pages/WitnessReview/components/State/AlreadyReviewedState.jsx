 const AlreadyReviewedState = () => {
  return (
    <div
      style={{
        minHeight: "60vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: "24px",
        background: "#f8fafc",
      }}
    >
      <div
        style={{
          maxWidth: "520px",
          width: "100%",
          background: "#ffffff",
          border: "1px solid #bbf7d0",
          borderRadius: "18px",
          padding: "36px",
          textAlign: "center",
          boxShadow:
            "0 12px 30px rgba(15,23,42,.08)",
        }}
      >
        <div
          style={{
            display: "inline-block",
            padding: "8px 18px",
            marginBottom: "20px",
            borderRadius: "999px",
            background: "#dcfce7",
            color: "#166534",
            fontWeight: 600,
          }}
        >
          Review Recorded
        </div>

        <h2
          style={{
            margin: "0 0 16px",
            fontSize: "1.8rem",
            color: "#0f172a",
          }}
        >
          Thank you for your review.
        </h2>

        <p
          style={{
            margin: "0 0 20px",
            color: "#475569",
            lineHeight: 1.8,
          }}
        >
          Your decision has already been securely
          recorded. Every review helps keep the
          accountability process fair and trustworthy.
        </p>

        <p
          style={{
            margin: 0,
            color: "#64748b",
            lineHeight: 1.7,
            fontSize: ".95rem",
          }}
        >
          No further action is required. The challenge
          creator has been notified and the review
          process will continue automatically.
        </p>
      </div>
    </div>
  );
};

export default AlreadyReviewedState;