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
        background: "#f8fafc",
      }}
    >
      <div
        style={{
          maxWidth: "520px",
          width: "100%",
          background: "#ffffff",
          border: "1px solid #fecaca",
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
            background: "#fef2f2",
            color: "#b91c1c",
            fontWeight: 600,
          }}
        >
          Unable to Continue
        </div>

        <h2
          style={{
            margin: "0 0 16px",
            fontSize: "1.8rem",
            color: "#0f172a",
          }}
        >
          We couldn't load this page.
        </h2>

        <p
          style={{
            margin: "0 0 20px",
            color: "#475569",
            lineHeight: 1.8,
          }}
        >
          {message}
        </p>

        <p
          style={{
            margin: 0,
            color: "#64748b",
            lineHeight: 1.7,
            fontSize: ".95rem",
          }}
        >
          If this problem continues, ask the challenge
          creator to send you a new invitation or try
          opening the link again later.
        </p>
      </div>
    </div>
  );
};

export default ErrorState;