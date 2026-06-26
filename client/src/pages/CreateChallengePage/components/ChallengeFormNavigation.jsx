 import "./ChallengeFormNavigation.css";

const ChallengeFormNavigation = ({
  currentStep,
  handleBack,
  handleNext,
  handleSubmit,
  isSubmitting,
}) => {
  return (
    <div className="challenge-form-navigation">
      {currentStep > 1 ? (
        <button
          type="button"
          className="challenge-form-navigation__button challenge-form-navigation__button--secondary"
          onClick={handleBack}
          disabled={isSubmitting}
        >
          Back
        </button>
      ) : (
        <div />
      )}

      {currentStep < 6 ? (
        <button
          type="button"
          className="challenge-form-navigation__button challenge-form-navigation__button--primary"
          onClick={handleNext}
          disabled={isSubmitting}
        >
          Next
        </button>
      ) : (
        <button
          type="button"
          className="challenge-form-navigation__button challenge-form-navigation__button--primary"
          onClick={handleSubmit}
          disabled={isSubmitting}
        >
          {isSubmitting
            ? "Creating Commitment..."
            : "Create Commitment"}
        </button>
      )}
    </div>
  );
};

export default ChallengeFormNavigation;