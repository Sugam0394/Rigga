import "./TrustSection.css";

function TrustSection() {
  return (
    <section className="trust-section">
      <h2 className="trust-section-title">
        Why Rigga Works
      </h2>

      <div className="trust-section-group">
        <p className="trust-section-heading">
          Accountability Process
        </p>

        <p className="trust-section-text">
          Create a commitment, assign a witness,
          complete the commitment, and verify
          the outcome.
        </p>
      </div>

      <div className="trust-section-divider" />

      <div className="trust-section-group">
        <p className="trust-section-heading">
          Why Witnesses Matter
        </p>

        <p className="trust-section-text">
          Witnesses independently verify whether
          a commitment was completed.
        </p>
      </div>

      <div className="trust-section-divider" />

      <div className="trust-section-group">
        <p className="trust-section-heading">
          Why We Verify Identity
        </p>

        <p className="trust-section-text">
          Identity verification helps ensure every
          commitment belongs to a real person.
        </p>
      </div>
    </section>
  );
}

export default TrustSection;