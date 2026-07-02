 import "./CreateChallengePage.css";

import { useCreateChallenge } from "./hooks/useCreateChallenge";

// Steps
import CommitmentStep from "./steps/CommitmentStep";
import DeadlineStep from "./steps/DeadlineStep";
import SuccessCriteriaStep from "./steps/SucessCriteriaStep";
import PrivateConsequenceStep from "./steps/PrivateConsequenceStep.jsx";
import ReviewStep from "./steps/ReviewStep";

// Components
import ChallengeProgressBar from "./components/ChallengeProgressBar";

const CreateChallengePage = () => {
  const challenge =
    useCreateChallenge();

  const renderStep = () => {
    switch (
      challenge.currentStep
    ) {
      case 1:
        return (
          <>
            <CommitmentStep
              {...challenge}
              showNavigation={false}
            />

            <DeadlineStep
              {...challenge}
              currentStep={1}
            />
          </>
        );

      case 2:
        return (
          <SuccessCriteriaStep
            {...challenge}
          />
        );

      case 3:
        return (
          <PrivateConsequenceStep
            {...challenge}
          />
        );

      case 4:
        return (
          <ReviewStep
            {...challenge}
          />
        );

      default:
        return null;
    }
  };

  return (
    <main className="create-challenge-page">
      <div className="create-challenge-page__container">
        <ChallengeProgressBar
          currentStep={
            challenge.currentStep
          }
        />

        <section className="create-challenge-page__content">
          {renderStep()}
        </section>
      </div>
    </main>
  );
};

export default CreateChallengePage;