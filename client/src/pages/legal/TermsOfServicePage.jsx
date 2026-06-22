import "./legal.css";



const TermsOfServicePage = () => {
  return (
    <main className="legal-page">
     <h1 className="legal-title">
  Terms of Service
</h1>

<p className="legal-description">
  These terms explain how Rigga operates,
  the responsibilities of users, and the
  role of witnesses in the accountability
  process.
</p>

     <section className="legal-section">
        <h2>About Rigga</h2>
        <p>
          Rigga is an accountability platform that helps users
          make commitments, track progress, and involve trusted
          witnesses in the verification process.
        </p>
      </section>

      <section className="legal-section">
        <h2>Account Responsibility</h2>
        <p>
          You are responsible for maintaining access to your
          account and providing accurate information.
        </p>
      </section>

      <section className="legal-section">
        <h2>Commitment Ownership</h2>
        <p>
          All commitments are created by users. Rigga does not
          create, modify, or own user commitments.
        </p>
      </section>

      <section className="legal-section">
        <h2>Witness Responsibility</h2>
        <p>
          Witnesses participate in reviewing challenge outcomes.
          Witness decisions may affect challenge results.
        </p>
      </section>

      <section className="legal-section">
        <h2>Platform Limitations</h2>
        <p>
          Rigga provides accountability tools but does not
          guarantee personal, professional, or financial success.
        </p>
      </section>

      <section className="legal-section">
        <h2>Acceptable Use</h2>
        <ul>
          <li>No fraud or impersonation.</li>
          <li>No abusive or harmful behavior.</li>
          <li>No illegal activity.</li>
          <li>No misuse of witness information.</li>
        </ul>
      </section>

      <section className="legal-section">
        <h2>Consequence Disclosure</h2>
        <p>
          Consequences and private accountability messages operate
          according to the challenge rules selected by users.
        </p>
      </section>

      <section className="legal-section">
        <h2>Contact</h2>
        <p>
          Support contact information will be provided in a future
          update.
        </p>
      </section>
    </main>
  );
};

export default TermsOfServicePage;