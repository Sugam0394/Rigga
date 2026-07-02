 import "./ChallengeProgressBar.css";

const ChallengeProgressBar = ({
  currentStep,
}) => {
  const TOTAL_STEPS = 4;

  const progress =
    (currentStep / TOTAL_STEPS) * 100;

  return (
    <div className="challenge-progress">
      <div className="challenge-progress__header">
        <span>
          Step {currentStep} of {TOTAL_STEPS}
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