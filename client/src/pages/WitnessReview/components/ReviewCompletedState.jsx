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
        {/* Badge */}

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

        {/* Heading */}

        <h1
          style={{
            margin: 0,
            marginBottom: "18px",
            fontSize: "2rem",
            color: "#0f172a",
          }}
        >
          Thank you for helping keep this challenge
          accountable.
        </h1>

        <p
          style={{
            color: "#475569",
            lineHeight: 1.8,
            marginBottom: "32px",
          }}
        >
          Your decision has been securely recorded.
          No further action is required unless the
          challenge creator submits an appeal.
        </p>

        {/* Result */}

        {approved ? (
          <div
            style={{
              background: "#f8fafc",
              border: "1px solid #e2e8f0",
              borderRadius: "16px",
              padding: "24px",
              textAlign: "left",
              marginBottom: "24px",
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
              You confirmed that this commitment was
              completed successfully. Your honest
              review helps maintain trust and
              accountability.
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
              marginBottom: "24px",
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
              Your decision has been recorded
              respectfully. Honest reviews help keep
              the accountability process fair for
              everyone.
            </p>
          </div>
        )}

        {/* What is Rigga */}

        <section
          style={{
            marginBottom: "24px",
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
            What is Rigga?
          </h3>

          <p
            style={{
              margin: 0,
              color: "#475569",
              lineHeight: 1.8,
            }}
          >
            Rigga helps people stay accountable to
            the commitments that matter most.
            Instead of relying on streaks or public
            pressure, people invite someone they
            trust to honestly verify whether they
            achieved their goal.
          </p>
        </section>

        {/* Why Witnesses Matter */}

        <section
          style={{
            marginBottom: "28px",
            background: "#ffffff",
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
            Why Your Role Matters
          </h3>

          <p
            style={{
              margin: 0,
              color: "#475569",
              lineHeight: 1.8,
            }}
          >
            Accountability only works when people
            can trust the review process. Your
            honest decision helped protect that
            trust and made this commitment
            meaningful.
          </p>
        </section>

        {/* Soft Conversion */}

        <section
          style={{
            borderTop: "1px solid #e2e8f0",
            paddingTop: "28px",
          }}
        >
          <h3
            style={{
              marginTop: 0,
              color: "#0f172a",
            }}
          >
            Thinking about a goal of your own?
          </h3>

          <p
            style={{
              color: "#475569",
              lineHeight: 1.8,
              marginBottom: "20px",
            }}
          >
            Rigga helps people turn meaningful
            commitments into real accountability by
            involving someone they trust.
          </p>

          <button
            type="button"
            style={{
              border: "none",
              borderRadius: "12px",
              padding: "14px 24px",
              background: "#2563eb",
              color: "#ffffff",
              fontWeight: 600,
              cursor: "pointer",
            }}
          >
            Learn More About Rigga
          </button>

          <p
            style={{
              marginTop: "22px",
              color: "#64748b",
              fontSize: "0.95rem",
              lineHeight: 1.7,
            }}
          >
            Thank you once again for helping someone
            stay accountable. Your review has been
            recorded and the challenge creator will
            receive the final outcome. You may
            safely close this page.
          </p>
        </section>
      </section>
    </main>
  );
};

export default ReviewCompletedState;