 import ChallengeReviewSummary from "../components/ChallengeReviewSummary";
import ChallengeFormNavigation from "../components/ChallengeFormNavigation";

const StakesStep = ({
  formData,
  errors,
  handleChange,
  handleBack,
  handleSubmit,
  isSubmitting,
  submitError,
}) => {
  const wordCount =
    formData.privateMessage.trim()
      ? formData.privateMessage
          .trim()
          .split(/\s+/)
          .filter(Boolean).length
      : 0;

  return (
    <div>
      <h1>
        What are the stakes if you fail?
      </h1>

      <p>
        This message stays private
        between you and Rigga.
      </p>

      <p>
        Be honest.
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
        placeholder="If I fail this commitment, this message may be revealed to my witness. I am writing this honestly because I want real accountability..."
      />

      <p>
        {wordCount} / 25 words minimum
      </p>

      {errors.privateMessage && (
        <p>
          {errors.privateMessage}
        </p>
      )}

      <ChallengeReviewSummary
        formData={formData}
      />

      <ChallengeFormNavigation
        currentStep={4}
        handleBack={handleBack}
        handleSubmit={handleSubmit}
        isSubmitting={isSubmitting}
      />

      {submitError && (
        <p>
          {submitError}
        </p>
      )}
    </div>
  );
};

export default StakesStep;