 import { useLocation, useNavigate } from "react-router-dom";

import { openNativeShare } from "../../utils/openNativeShare";

import "./ShareWithWitnessPage.css";

const ShareWithWitnessPage = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const { challenge, invitation } =
    location.state || {};

    if (!challenge || !invitation) {
  navigate("/home");
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
        "Error sharing with witness:",
        error
      );
      alert(
        "Unable to open sharing options. Please try again."
      );
    }
  };

  const handleSkip = () => {
    navigate("/home");
  };

  return (
    <main className="share-with-witness-page">
      <div className="share-with-witness-page__container">
        <h1 className="share-with-witness-page__title">
          Challenge Created ✅
        </h1>

        <p className="share-with-witness-page__description">
          Your challenge has been created successfully.
          Now invite someone to become your witness.
        </p>

        <div className="share-with-witness-page__card">
          <p>
            <strong>Commitment</strong>
          </p>

          <p>{challenge?.title}</p>

          <br />

          <p>
            <strong>Deadline</strong>
          </p>

          <p>{challenge?.deadlineAt}</p>

          <br />

          <p>
            <strong>Status</strong>
          </p>

          <p>{challenge?.status}</p>
        </div>

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