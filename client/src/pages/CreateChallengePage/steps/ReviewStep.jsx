 import ChallengeReviewSummary from "../components/ChallengeReviewSummary";
import ChallengeFormNavigation from "../components/ChallengeFormNavigation";
import './ReviewStep.css'
const ReviewStep = ({
  formData,
  handleBack,
  handleSubmit,
  isSubmitting,
  submitError,
  showSubscriptionModal,
setShowSubscriptionModal,
}) => {
  return (
    <div className="challenge-step">
      <h1 className="challenge-step__title">
        Review Your Commitment
      </h1>

      <p className="challenge-step__description">
        Review your commitment carefully before creating
        your challenge.
      </p>

      <ChallengeReviewSummary
        formData={formData}
      />

      {submitError && (
        <p className="challenge-step__error">
          {submitError}
        </p>
      )}

      <ChallengeFormNavigation
        currentStep={4}
        handleBack={handleBack}
        handleSubmit={handleSubmit}
        isSubmitting={isSubmitting}
      />
      {showSubscriptionModal && (
  <div className="subscription-modal-overlay">
    <div className="subscription-modal">
      <h2>
        Active Challenge Limit Reached
      </h2>

      <p>
        Free plan allows up to 2 active
        commitments.
      </p>

      <p>
        Upgrade to Pro for unlimited
        active challenges.
      </p>

      <div className="subscription-modal__actions">
        <button
          type="button"
          className="subscription-modal__upgrade"
        >
          Upgrade to Pro
        </button>

        <button
          type="button"
          className="subscription-modal__later"
          onClick={() =>
            setShowSubscriptionModal(false)
          }
        >
          Maybe Later
        </button>
      </div>
    </div>
  </div>
)}
    </div>
  );
};

export default ReviewStep;