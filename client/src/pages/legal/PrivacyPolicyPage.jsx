 import DataUsageDisclosure from "./DetailUsageDisclosure";
import CookieDisclosure from "./CookieDisclosure";
import "./legal.css";

import { LEGAL_CONTACT } from "./legalContact";

const PrivacyPolicyPage = () => {
  return (
    <main className="legal-page">
      <h1 className="legal-title">
        Privacy Policy
      </h1>

      <p className="legal-description">
        This Privacy Policy explains what information Rigga
        collects, how it is used, how it is protected, and the
        choices available to users. Rigga is an accountability
        platform designed to help users create commitments,
        track progress, and verify outcomes with trusted
        witnesses.
      </p>

      <DataUsageDisclosure />

      <CookieDisclosure />

      <section className="legal-section">
        <h2>Information We Collect</h2>

        <h3>Phone Number</h3>
        <p>
          Your phone number is used for identity verification,
          secure account access, and authentication. Your phone
          number is not displayed publicly to other users or
          witnesses.
        </p>

        <h3>Email Address</h3>
        <p>
          Your email address may be used for account security,
          important service updates, support communication, and
          future account recovery features.
        </p>

        <h3>Witness Information</h3>
        <p>
          Rigga stores witness information provided by users to
          support accountability verification. Witness
          information is used only for participation in the
          accountability process and is never used for marketing
          purposes.
        </p>

        <h3>Challenge Records</h3>
        <p>
          Rigga stores challenge information including
          commitments, deadlines, checkpoints, progress history,
          verification status, and accountability records to
          operate the platform.
        </p>

        <h3>Private Accountability Messages</h3>
        <p>
          Private accountability messages remain private during
          an active challenge and are handled according to the
          challenge rules selected by the user.
        </p>

        <h3>Evidence Uploads</h3>
        <p>
          Users may upload evidence such as images or other
          supported files as part of challenge verification.
          Evidence remains private during an active challenge.
          If a challenge fails according to its rules, the
          relevant witness may be able to view the evidence or
          accountability content required for verification.
        </p>

        <h3>Authentication Data</h3>
        <p>
          Authentication information is used to maintain secure
          login sessions and protect user accounts.
        </p>
      </section>

      <section className="legal-section">
        <h2>How We Use Your Information</h2>

        <p>
          Rigga uses collected information to authenticate users,
          manage accountability challenges, support witness
          verification, maintain platform security, improve user
          experience, and provide requested services.
        </p>

        <p>
          In the future, Rigga may introduce AI-assisted
          accountability planning and similar features. If AI
          services process user information, this Privacy Policy
          will be updated to clearly explain what information is
          processed and for what purpose.
        </p>
      </section>

      <section className="legal-section">
        <h2>Sharing of Information</h2>

        <p>
          Rigga does not sell personal information.
        </p>

        <p>
          Accountability evidence, private messages, and related
          challenge content are not shared publicly.
        </p>

        <p>
          Witnesses may only receive access to information that
          is required by the accountability rules of a challenge.
        </p>

        <p>
          Rigga may work with trusted third-party service
          providers, such as cloud storage or communication
          providers, to operate the platform. If additional
          third-party services are introduced in the future,
          their use will be reflected in this Privacy Policy.
        </p>
      </section>

      <section className="legal-section">
        <h2>Data Protection</h2>

        <p>
          We collect only the information reasonably necessary
          to operate Rigga.
        </p>

        <p>
          We use reasonable technical and organizational
          safeguards to help protect user information against
          unauthorized access, misuse, or disclosure.
        </p>

        <p>
          While we work to protect user information, no internet
          service or electronic storage system can be guaranteed
          to be completely secure.
        </p>
      </section>

      <section className="legal-section">
        <h2>Data Retention</h2>

        <p>
          Rigga retains information only for as long as
          reasonably necessary to provide the service, maintain
          challenge history, resolve disputes, comply with legal
          obligations, and enforce these policies.
        </p>
      </section>

      <section className="legal-section">
        <h2>Account Deletion</h2>

        <p>
          Rigga does not currently provide an in-app account
          deletion feature.
        </p>

        <p>
          Users who wish to request account deletion may contact
          support using the email address below. If an automated
          deletion feature is introduced in the future, this
          policy will be updated accordingly.
        </p>
      </section>

      <section className="legal-section">
        <h2>User Rights</h2>

        <p>
          Users may contact Rigga to request access to their
          account information, request corrections, request
          account deletion, or ask privacy-related questions.
        </p>
      </section>

      <section className="legal-section">
        <h2>Changes to This Policy</h2>

        <p>
          This Privacy Policy may be updated from time to time as
          Rigga evolves. Material changes will be reflected on
          this page with the updated policy.
        </p>
      </section>

      <section className="legal-section">
        <h2>Contact</h2>

        <p>
          For privacy questions, account requests, or data
          concerns, contact us at:
        </p>

        <p>
          <strong>{LEGAL_CONTACT.email}</strong>
        </p>
      </section>
    </main>
  );
};

export default PrivacyPolicyPage;