 const DataUsageDisclosure = () => {
  return (
    <section className="legal-section">
      <h2>How Your Data Is Used</h2>

      <p>
        Rigga collects only the information necessary to provide
        accountability services, maintain account security, and
        support challenge verification. Each type of information
        has a specific purpose and is not collected for unrelated
        activities.
      </p>

      <ul>
        <li>
          <strong>Phone Number</strong> — Used for identity
          verification, secure login, authentication, and account
          access.
        </li>

        <li>
          <strong>Email Address</strong> — Used for important
          account notifications, support communication, security
          updates, and future account recovery features.
        </li>

        <li>
          <strong>Witness Information</strong> — Used only to
          support accountability verification and witness
          participation in challenges created by users.
        </li>

        <li>
          <strong>Challenge Records</strong> — Used to manage
          commitments, deadlines, checkpoints, progress history,
          verification results, and accountability records.
        </li>

        <li>
          <strong>Private Accountability Messages</strong> —
          Stored as part of a user's challenge and handled
          according to the accountability rules selected by the
          user.
        </li>

        <li>
          <strong>Evidence Uploads</strong> — Images and other
          supported evidence files may be collected to help verify
          challenge progress. Evidence remains private during an
          active challenge and is only made available according to
          the challenge rules.
        </li>

        <li>
          <strong>Authentication Data</strong> — Used to maintain
          secure user sessions, protect accounts, and prevent
          unauthorized access.
        </li>

        <li>
          <strong>Cookies</strong> — Used only for essential
          authentication and session management. Rigga does not
          use advertising or third-party tracking cookies.
        </li>
      </ul>

      <p>
        Rigga does not sell personal information. Information is
        collected only to operate the platform, improve
        accountability features, maintain security, and deliver
        requested services.
      </p>
    </section>
  );
};

export default DataUsageDisclosure;