 import ChallengeFormNavigation from "../components/ChallengeFormNavigation";

const SuccessCriteriaStep = ({
  formData,
  errors,
  handleChange,
  handleNext,
  handleBack,
}) => {
  const characterCount =
    formData.successCriteria.length;

  return (
    <div className="challenge-step">
      <h1 className="challenge-step__title">
        How will success be verified?
      </h1>

      <p className="challenge-step__description">
        Define the verification contract for this
        commitment. Your witness will use these
        criteria to decide whether you
        successfully fulfilled your commitment.
      </p>

      <textarea
        rows={6}
        value={formData.successCriteria}
        onChange={(e) =>
          handleChange(
            "successCriteria",
            e.target.value
          )
        }
        placeholder="Example: Wake up before 6:00 AM every day and submit a morning selfie before 6:15 AM."
      />

      <p className="challenge-step__counter">
        {characterCount}/500
      </p>

      {errors.successCriteria && (
        <p className="challenge-step__error">
          {errors.successCriteria}
        </p>
      )}

      <ChallengeFormNavigation
        currentStep={3}
        handleBack={handleBack}
        handleNext={handleNext}
      />
    </div>
  );
};

export default SuccessCriteriaStep;