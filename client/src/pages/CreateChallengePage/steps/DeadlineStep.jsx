 import ChallengeFormNavigation from "../components/ChallengeFormNavigation";

const DeadlineStep = ({
  formData,
  errors,
  handleChange,
  handleNext,
  handleBack,
  currentStep,
}) => {
  const now = new Date();

  const minDateTime =
    new Date(
      now.getTime() -
        now.getTimezoneOffset() * 60000
    )
      .toISOString()
      .slice(0, 16);

  return (
    <div className="challenge-step">
      <h1 className="challenge-step__title">
        When must this be completed?
      </h1>

      <p className="challenge-step__description">
        Choose the deadline by which this commitment
        must be successfully completed.
      </p>

      <input
        type="datetime-local"
        value={formData.deadlineAt}
        min={minDateTime}
        onChange={(e) =>
          handleChange(
            "deadlineAt",
            e.target.value
          )
        }
      />

      {errors.deadlineAt && (
        <p className="challenge-step__error">
          {errors.deadlineAt}
        </p>
      )}

      <ChallengeFormNavigation
        currentStep={currentStep}
        handleBack={handleBack}
        handleNext={handleNext}
      />
    </div>
  );
};

export default DeadlineStep;