import "./legal.css";

const SUPPORT_EMAIL = "singhsugam348@gmail.com";

const CookiePolicyPage = () => {
  return (
    <main className="legal-page">
      <h1 className="legal-title">
        Cookie Policy
      </h1>

      <p className="legal-description">
        This Cookie Policy explains how Rigga uses cookies to
        provide secure authentication, maintain user sessions,
        and operate essential platform functionality.
      </p>

      <section className="legal-section">
        <h2>What Are Cookies?</h2>

        <p>
          Cookies are small text files stored on your device by
          your web browser. They help websites remember
          information such as your authenticated session and
          security preferences while you use the platform.
        </p>
      </section>

      <section className="legal-section">
        <h2>How Rigga Uses Cookies</h2>

        <p>
          Rigga uses only essential cookies that are required for
          secure authentication and normal platform operation.
          These cookies allow users to remain signed in while
          navigating between pages and help protect user
          accounts.
        </p>
      </section>

      <section className="legal-section">
        <h2>Essential Authentication Cookies</h2>

        <p>
          Authentication cookies verify your identity after you
          sign in and maintain your secure session while using
          Rigga.
        </p>

        <p>
          Without these cookies, authenticated features of Rigga
          cannot function correctly.
        </p>
      </section>

      <section className="legal-section">
        <h2>Session Management</h2>

        <p>
          Session cookies allow Rigga to remember your login
          session while you move between pages without requiring
          repeated authentication.
        </p>
      </section>

      <section className="legal-section">
        <h2>Cookies We Do Not Use</h2>

        <ul>
          <li>No advertising cookies.</li>

          <li>No third-party tracking cookies.</li>

          <li>No behavioral advertising cookies.</li>

          <li>No cookies used to sell personal information.</li>

          <li>
            No cookies used to build advertising profiles.
          </li>
        </ul>
      </section>

      <section className="legal-section">
        <h2>Third-Party Services</h2>

        <p>
          Rigga currently uses trusted third-party services to
          support platform functionality, including cloud storage
          and communication services where applicable.
        </p>

        <p>
          If future services such as AI-assisted accountability
          planning require additional cookie usage, this Cookie
          Policy will be updated before those cookies are used.
        </p>
      </section>

      <section className="legal-section">
        <h2>Managing Cookies</h2>

        <p>
          Most web browsers allow users to control or delete
          cookies through browser settings.
        </p>

        <p>
          Please note that disabling essential authentication
          cookies may prevent certain Rigga features from working
          correctly or may prevent users from signing in.
        </p>
      </section>

      <section className="legal-section">
        <h2>Changes to This Policy</h2>

        <p>
          Rigga may update this Cookie Policy as the platform
          evolves or when new technologies are introduced.
          Updated versions will be published on this page.
        </p>
      </section>

      <section className="legal-section">
        <h2>Contact</h2>

        <p>
          If you have questions about this Cookie Policy, please
          contact:
        </p>

        <p>
          <strong>{SUPPORT_EMAIL}</strong>
        </p>
      </section>
    </main>
  );
};

export default CookiePolicyPage;