 import { useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { openNativeShare } from "../../utils/openNativeShare";

import "./ShareWithWitnessPage.css";

const ShareWithWitnessPage = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const { challenge, invitation } =
    location.state || {};

 

useEffect(() => {
  if (!challenge || !invitation) {
    navigate("/home", {
      replace: true,
    });
  }
}, [challenge, invitation, navigate]);

if (!challenge || !invitation) {
  return null;
}

  const handleShare = async () => {
    try {
       const invitationLink =
  `${window.location.origin}/witness/${invitation.token}`;

      const message = `Hi,

I'd like you to be the witness for my Rigga challenge.

Commitment:
${challenge.title}

Deadline:
${challenge.deadlineAt}

Success Criteria:
${challenge.successCriteria}

Open this invitation:

${invitationLink}`;

      await openNativeShare({
        message,
      });
    } catch (error) {
  console.error(
    "Unable to share invitation.",
    error
  );

  alert(
    "Unable to share the invitation. Please try again."
  );
}
  };

  const handleSkip = () => {
    navigate("/home");
  };

  return (
    <main className="share-with-witness-page">
      <div className="share-with-witness-page__container">
         <div className="share-with-witness-page__hero">

  <div className="share-with-witness-page__badge">
    Challenge Ready
  </div>

  <h1 className="share-with-witness-page__title">
    Your accountability challenge is ready.
  </h1>

  <p className="share-with-witness-page__description">
    The final step is inviting someone you trust to
    become your witness. Their honest review will help
    keep this commitment meaningful.
  </p>

</div>

        <div className="share-with-witness-page__card">

  <div className="share-with-witness-page__item">
    <h3>Commitment</h3>
    <p>{challenge.title}</p>
  </div>

  <div className="share-with-witness-page__item">
    <h3>Success Criteria</h3>
    <p>{challenge.successCriteria}</p>
  </div>

  <div className="share-with-witness-page__item">
    <h3>Deadline</h3>
    <p>
      {new Date(challenge.deadlineAt).toLocaleDateString()}
    </p>
  </div>

  <div className="share-with-witness-page__item">
    <h3>Status</h3>
    <p>{challenge.status}</p>
  </div>

</div>
 

<section className="share-with-witness-page__info">

  <div className="share-with-witness-page__info-card">

    <h3>
      Why invite a witness?
    </h3>

    <p>
      Your witness will honestly verify whether this
      commitment was completed. Accountability works
      best when someone you trust can confirm your
      progress.
    </p>

  </div>

</section>

<section className="share-with-witness-page__trust">

  <div className="share-with-witness-page__trust-item">
    ✓ Only invited witnesses can review
  </div>

  <div className="share-with-witness-page__trust-item">
    ✓ Private invitation link
  </div>

  <div className="share-with-witness-page__trust-item">
    ✓ No public sharing
  </div>

</section>

        <button
          type="button"
          className="share-with-witness-page__primary-button"
          onClick={handleShare}
        >
          Share With Witness
        </button>

        <button
          type="button"
          className="share-with-witness-page__secondary-button"
          onClick={handleSkip}
        >
          I'll Do This Later
        </button>
      </div>
    </main>
  );
};

export default ShareWithWitnessPage;