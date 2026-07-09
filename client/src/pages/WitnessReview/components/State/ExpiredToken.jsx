 const ExpiredTokenState = () => {
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
          border: "1px solid #fde68a",
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
            background: "#fef3c7",
            color: "#92400e",
            fontWeight: 600,
          }}
        >
          Invitation Expired
        </div>

        <h2
          style={{
            margin: "0 0 16px",
            fontSize: "1.8rem",
            color: "#0f172a",
          }}
        >
          This invitation is no longer available.
        </h2>

        <p
          style={{
            margin: "0 0 20px",
            color: "#475569",
            lineHeight: 1.8,
          }}
        >
          This invitation has expired and can no
          longer be used. Expired links are disabled
          to protect the integrity of the
          accountability process.
        </p>

        <p
          style={{
            margin: 0,
            color: "#64748b",
            lineHeight: 1.7,
            fontSize: ".95rem",
          }}
        >
          If you still want to help review this
          challenge, ask the creator to send you a
          new invitation.
        </p>
      </div>
    </div>
  );
};

export default ExpiredTokenState;