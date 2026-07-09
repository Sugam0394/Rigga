
 const ReviewCompletedState = ({
  decision,
}) => {
  const approved =
    decision === "APPROVED";

  return (
    <main
      style={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: "24px",
        background: "#f8fafc",
      }}
    >
      <section
        style={{
          width: "100%",
          maxWidth: "620px",
          background: "#ffffff",
          borderRadius: "20px",
          padding: "40px",
          boxShadow:
            "0 12px 30px rgba(15,23,42,.08)",
          textAlign: "center",
        }}
      >
        <div
          style={{
            display: "inline-block",
            padding: "8px 18px",
            borderRadius: "999px",
            background: approved
              ? "#dcfce7"
              : "#fef2f2",
            color: approved
              ? "#166534"
              : "#b91c1c",
            fontWeight: 600,
            marginBottom: "24px",
          }}
        >
          {approved
            ? "Review Recorded"
            : "Decision Recorded"}
        </div>

        <h1
          style={{
            margin: 0,
            marginBottom: "18px",
            fontSize: "2rem",
            color: "#0f172a",
          }}
        >
          Thank you for helping keep
          this challenge accountable.
        </h1>

        <p
          style={{
            color: "#475569",
            lineHeight: 1.8,
            marginBottom: "32px",
          }}
        >
          Your decision has been
          securely recorded. No further
          action is required unless the
          challenge creator submits an
          appeal.
        </p>

        {approved ? (
          <div
            style={{
              background: "#f8fafc",
              border: "1px solid #e2e8f0",
              borderRadius: "16px",
              padding: "24px",
              textAlign: "left",
            }}
          >
            <h3
              style={{
                marginTop: 0,
                color: "#0f172a",
              }}
            >
              Challenge Approved
            </h3>

            <p
              style={{
                marginBottom: 0,
                color: "#475569",
                lineHeight: 1.7,
              }}
            >
              You confirmed that this
              commitment was completed
              successfully. Your honest
              review helps maintain
              trust and accountability.
            </p>
          </div>
        ) : (
          <div
            style={{
              background: "#f8fafc",
              border: "1px solid #e2e8f0",
              borderRadius: "16px",
              padding: "24px",
              textAlign: "left",
            }}
          >
            <h3
              style={{
                marginTop: 0,
                color: "#0f172a",
              }}
            >
              Challenge Not Approved
            </h3>

            <p
              style={{
                marginBottom: 0,
                color: "#475569",
                lineHeight: 1.7,
              }}
            >
              Your decision has been
              recorded respectfully.
              Honest reviews help keep
              the accountability process
              fair for everyone.
            </p>
          </div>
        )}
      </section>
    </main>
  );
};

export default ReviewCompletedState;