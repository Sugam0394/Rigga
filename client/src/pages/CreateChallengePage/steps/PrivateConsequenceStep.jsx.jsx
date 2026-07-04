 import ChallengeFormNavigation from "../components/ChallengeFormNavigation";

const PrivateConsequenceStep = ({
  formData,
  errors,
  handleChange,
  handleBack,
  handleNext,
}) => {
  const wordCount =
    formData.privateMessage.trim()
      ? formData.privateMessage
          .trim()
          .split(/\s+/)
          .filter(Boolean).length
      : 0;

  return (
    <div className="challenge-step">
      <h1 className="challenge-step__title">
        Private Consequence
      </h1>

      <p className="challenge-step__description">
        Write a private message that will only
        be shared with your witness if this
        commitment ultimately fails.
      </p>

      <p className="challenge-step__description">
        Rigga never creates or edits this
        message. It is written entirely by you
        and remains private unless the
        commitment ultimately fails.
      </p>

      <textarea
        rows={8}
        value={formData.privateMessage}
        onChange={(e) =>
          handleChange(
            "privateMessage",
            e.target.value
          )
        }
        placeholder="If I fail this commitment, this message will only be shared with my witness..."
      />

      <p className="challenge-step__counter">
        {wordCount} / 25 words minimum
      </p>

      {errors.privateMessage && (
        <p className="challenge-step__error">
          {errors.privateMessage}
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

export default PrivateConsequenceStep;