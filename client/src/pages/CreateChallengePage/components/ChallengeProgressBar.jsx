 import "./ChallengeProgressBar.css";

const ChallengeProgressBar = ({
  currentStep,
}) => {
  const progress =
    (currentStep / 6) * 100;

  return (
    <div className="challenge-progress">
      <div className="challenge-progress__header">
        <span>
          Step {currentStep} of 6
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