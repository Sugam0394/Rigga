 import "./legal.css";

const SUPPORT_EMAIL = "singhsugam348@gmail.com";

const TermsOfServicePage = () => {
  return (
    <main className="legal-page">
      <h1 className="legal-title">
        Terms of Service
      </h1>

      <p className="legal-description">
        These Terms of Service explain the rules for using Rigga,
        the responsibilities of users and witnesses, and how the
        platform operates. By creating an account or using Rigga,
        you agree to these terms.
      </p>

      <section className="legal-section">
        <h2>About Rigga</h2>

        <p>
          Rigga is an accountability platform that helps users
          create commitments, track progress, submit evidence, and
          verify challenge outcomes with trusted witnesses.
        </p>

        <p>
          Rigga provides accountability tools designed to support
          personal commitments. Rigga is not a professional,
          medical, legal, financial, or psychological advisory
          service.
        </p>
      </section>

      <section className="legal-section">
        <h2>Eligibility</h2>

        <p>
          You must use accurate information when creating an
          account and must have the legal ability to accept these
          Terms in your jurisdiction.
        </p>
      </section>

      <section className="legal-section">
        <h2>Account Responsibility</h2>

        <p>
          You are responsible for maintaining the security of your
          account and protecting access to your login credentials.
        </p>

        <p>
          You are responsible for all activity performed through
          your account.
        </p>

        <p>
          You agree to provide accurate and truthful information
          while using Rigga.
        </p>
      </section>

      <section className="legal-section">
        <h2>User Commitments</h2>

        <p>
          All commitments, deadlines, goals, private
          accountability messages, uploaded evidence, and witness
          selections are created entirely by users.
        </p>

        <p>
          Rigga provides the platform used to manage
          accountability but does not create, edit, or guarantee
          the accuracy of user-created commitments.
        </p>
      </section>

      <section className="legal-section">
        <h2>Witness Participation</h2>

        <p>
          Users may invite trusted witnesses to participate in the
          accountability process.
        </p>

        <p>
          Witnesses review challenge outcomes according to the
          rules established for each challenge.
        </p>

        <p>
          Witness decisions may directly affect challenge results,
          including whether accountability consequences are
          triggered.
        </p>
      </section>

      <section className="legal-section">
        <h2>Evidence and Accountability Content</h2>

        <p>
          Users may upload evidence to support challenge progress
          and verification.
        </p>

        <p>
          Evidence, private accountability messages, and similar
          content remain private during an active challenge.
        </p>

        <p>
          If a challenge fails according to its accountability
          rules, the assigned witness may receive access to
          information required for verification.
        </p>
      </section>

      <section className="legal-section">
        <h2>AI-Assisted Features</h2>

        <p>
          Rigga may introduce AI-assisted accountability planning
          or similar features in the future.
        </p>

        <p>
          Any AI-generated suggestions are intended only to assist
          users and should not be considered professional advice
          or guarantees of success.
        </p>
      </section>

      <section className="legal-section">
        <h2>User-Generated Content</h2>

        <p>
          Users remain responsible for all information, evidence,
          messages, and other content they upload or submit
          through Rigga.
        </p>

        <p>
          You must have the necessary rights to upload any content
          you submit.
        </p>
      </section>

      <section className="legal-section">
        <h2>Acceptable Use</h2>

        <ul>
          <li>No fraud or impersonation.</li>

          <li>No abusive, threatening, or harmful behavior.</li>

          <li>No illegal activity.</li>

          <li>No misuse of witness information.</li>

          <li>No attempts to bypass platform security.</li>

          <li>No uploading malicious software or harmful content.</li>

          <li>No interference with the normal operation of Rigga.</li>
        </ul>
      </section>

      <section className="legal-section">
        <h2>Account Suspension or Termination</h2>

        <p>
          Rigga may temporarily suspend or permanently terminate
          accounts that violate these Terms, abuse platform
          features, attempt fraudulent activity, or interfere with
          the security or operation of the service.
        </p>
      </section>

      <section className="legal-section">
        <h2>Intellectual Property</h2>

        <p>
          The Rigga platform, branding, design, software, and
          related intellectual property belong to Rigga unless
          otherwise stated.
        </p>

        <p>
          Users retain ownership of the content they create and
          upload.
        </p>
      </section>

      <section className="legal-section">
        <h2>Platform Limitations</h2>

        <p>
          Rigga provides accountability tools only.
        </p>

        <p>
          We do not guarantee successful completion of any
          challenge or personal, educational, financial,
          professional, or health-related outcomes.
        </p>

        <p>
          Users remain solely responsible for their own decisions
          and actions.
        </p>
      </section>

      <section className="legal-section">
        <h2>Limitation of Liability</h2>

        <p>
          To the maximum extent permitted by applicable law,
          Rigga is not responsible for losses arising from
          user-created commitments, witness decisions, inaccurate
          information submitted by users, or interruptions in
          platform availability.
        </p>
      </section>

      <section className="legal-section">
        <h2>Changes to the Service</h2>

        <p>
          Rigga may improve, modify, suspend, or discontinue
          features as the platform evolves.
        </p>

        <p>
          Updated Terms may be published when significant changes
          occur.
        </p>
      </section>

      <section className="legal-section">
        <h2>Contact</h2>

        <p>
          Questions regarding these Terms of Service may be sent
          to:
        </p>

        <p>
          <strong>{SUPPORT_EMAIL}</strong>
        </p>
      </section>
    </main>
  );
};

export default TermsOfServicePage;