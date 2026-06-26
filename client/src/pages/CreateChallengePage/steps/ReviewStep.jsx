 import ChallengeReviewSummary from "../components/ChallengeReviewSummary";
import ChallengeFormNavigation from "../components/ChallengeFormNavigation";

const ReviewStep = ({
  formData,
  handleBack,
  handleSubmit,
  isSubmitting,
  submitError,
}) => {
  return (
    <div className="challenge-step">
      <h1 className="challenge-step__title">
        Review Your Commitment
      </h1>

      <p className="challenge-step__description">
        Review your commitment carefully before
        activating it. Once created, your
        accountability journey officially
        begins.
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
        currentStep={6}
        handleBack={handleBack}
        handleSubmit={handleSubmit}
        isSubmitting={isSubmitting}
      />
    </div>
  );
};

export default ReviewStep;