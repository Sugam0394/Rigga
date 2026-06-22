import DataUsageDisclosure from "./DetailUsageDisclosure";
import CookieDisclosure from "./CookieDisclosure";







const PrivacyPolicyPage = () => {
  return (
    <main>
      <h1>Privacy Policy</h1>

      <DataUsageDisclosure />

      <CookieDisclosure />

      <section>
        <h2>Information We Collect</h2>

        <h3>Phone Number</h3>
        <p>
          Used for identity verification and account access.
        </p>

        <h3>Email Address</h3>
        <p>
          Used for account security and important updates.
        </p>

        <h3>Witness Information</h3>
        <p>
          Used to support accountability verification.
        </p>

        <h3>Authentication Data</h3>
        <p>
          Used to maintain secure sessions and account access.
        </p>

        <h3>Challenge Records</h3>
        <p>
          Used to provide accountability tracking and challenge
          history.
        </p>
      </section>

      <section>
        <h2>Data Protection</h2>

        <p>
          We collect only information necessary to operate Rigga.
        </p>

        <p>
          We do not sell personal information.
        </p>

        <p>
          We use reasonable security measures to protect user
          data.
        </p>
      </section>

      <section>
        <h2>User Rights</h2>

        <p>
          Users may contact support regarding account and data
          related requests.
        </p>
      </section>
    </main>
  );
};

export default PrivacyPolicyPage;