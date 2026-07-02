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
        Describe what your witness should look for
        to know you've successfully completed this
        commitment.
      </p>

      <p className="challenge-step__helper">
        Write something clear and measurable that
        your witness can easily verify.
      </p>

      <div className="challenge-step__examples">
        <strong>Examples</strong>

        <ul>
          <li>
            Room is fully cleaned and all clothes
            are put away.
          </li>

          <li>
            Complete a 5 km run without stopping.
          </li>

          <li>
            Read all 20 pages and explain the main
            ideas.
          </li>

          <li>
            Finish today's workout with all planned
            exercises completed.
          </li>

          <li>
            Wake up before 6:00 AM every day for 30
            days.
          </li>
        </ul>
      </div>

      <textarea
        rows={6}
        value={formData.successCriteria}
        onChange={(e) =>
          handleChange(
            "successCriteria",
            e.target.value
          )
        }
        placeholder="Example: Complete a 5 km run without stopping."
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
        currentStep={2}
        handleBack={handleBack}
        handleNext={handleNext}
      />
    </div>
  );
};

export default SuccessCriteriaStep;