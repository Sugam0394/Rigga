 import { useCreateChallenge } from "./hooks/useCreateChallenge";

// Steps
import CommitmentStep from "./steps/CommitmentStep";
import DeadlineStep from "./steps/DeadlineStep";
import WitnessStep from "./steps/WitnessStep";
import StakesStep from "./steps/StakeStep";

// Components
import ChallengeProgressBar from "./components/ChallengeProgressBar"

const CreateChallengePage = () => {
  const challenge =
    useCreateChallenge();

  const renderStep = () => {
    switch (
      challenge.currentStep
    ) {
      case 1:
        return (
          <CommitmentStep
            {...challenge}
          />
        );

      case 2:
        return (
          <DeadlineStep
            {...challenge}
          />
        );

      case 3:
        return (
          <WitnessStep
            {...challenge}
          />
        );

      case 4:
        return (
          <StakesStep
            {...challenge}
          />
        );

      default:
        return null;
    }
  };

  return (
    <div>
      <ChallengeProgressBar
        currentStep={
          challenge.currentStep
        }
      />

      {renderStep()}
    </div>
  );
};

export default CreateChallengePage;