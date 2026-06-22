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
           Create a commitment, invite a trusted witness,
track your progress, and verify the final outcome.
        </p>
      </div>

      <div className="trust-section-divider" />

      <div className="trust-section-group">
        <p className="trust-section-heading">
          Why Witnesses Matter
        </p>

        <p className="trust-section-text">
          Witnesses help create accountability by
independently reviewing challenge outcomes.
        </p>
      </div>

      <div className="trust-section-divider" />

      <div className="trust-section-group">
        <p className="trust-section-heading">
          Why We Verify Identity
        </p>

        <p className="trust-section-text">
        Identity verification helps protect trust,
reduce misuse, and ensure commitments are
connected to real people.
        </p>
      </div>
    </section>
  );
}

export default TrustSection;