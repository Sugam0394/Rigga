 import "./ChallengeProgressBar.css";

const ChallengeProgressBar = ({
  currentStep,
}) => {
  const progress =
     (currentStep / 5) * 100;

  return (
    <div className="challenge-progress">
      <div className="challenge-progress__header">
        <span>
           Step {currentStep} of 5
        </span>

        <span>
          {Math.round(progress)}%
        </span>
      </div>

      <div className="challenge-progress__track">
        <div
          className="challenge-progress__fill"
          style={{
            width: `${progress}%`,
          }}
        />
      </div>
    </div>
  );
};

export default ChallengeProgressBar;