const ChallengeFormNavigation = ({
  currentStep,
  handleBack,
  handleNext,
  handleSubmit,
  isSubmitting,
}) => {
  return (
    <div>
      {currentStep > 1 && (
        <button
          onClick={handleBack}
          disabled={isSubmitting}
        >
          Back
        </button>
      )}

      {currentStep < 4 ? (
        <button
          onClick={handleNext}
          disabled={isSubmitting}
        >
          Next
        </button>
      ) : (
        <button
          onClick={handleSubmit}
          disabled={isSubmitting}
        >
          {isSubmitting
            ? "Creating..."
            : "Submit"}
        </button>
      )}
    </div>
  );
};

export default ChallengeFormNavigation;