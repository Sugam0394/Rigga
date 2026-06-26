 import GlobalPhoneInput from "../../../features/auth/components/GlobalPhoneInput";
import ChallengeFormNavigation from "../components/ChallengeFormNavigation";

const WitnessStep = ({
  formData,
  errors,
  handleChange,
  handleNext,
  handleBack,
}) => {
  return (
    <div className="challenge-step">
      <h1 className="challenge-step__title">
        Who will verify this commitment?
      </h1>

      <p className="challenge-step__description">
        Choose someone who can honestly verify
        whether you fulfilled this commitment.
      </p>

      <input
        type="text"
        placeholder="Witness Name"
        value={formData.witnessName}
        onChange={(e) =>
          handleChange(
            "witnessName",
            e.target.value
          )
        }
      />

      {errors.witnessName && (
        <p className="challenge-step__error">
          {errors.witnessName}
        </p>
      )}

      <GlobalPhoneInput
        value={formData.witnessPhone}
        onChange={(value) =>
          handleChange(
            "witnessPhone",
            value || ""
          )
        }
        placeholder="Enter witness phone number"
      />

      {errors.witnessPhone && (
        <p className="challenge-step__error">
          {errors.witnessPhone}
        </p>
      )}

      <ChallengeFormNavigation
        currentStep={4}
        handleBack={handleBack}
        handleNext={handleNext}
      />
    </div>
  );
};

export default WitnessStep;