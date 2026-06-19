const ChallengeProgressBar = ({
  currentStep,
}) => {
  const progress =
    (currentStep / 4) * 100;

  return (
    <div>
      <p>
        Step {currentStep} of 4
      </p>

      <div
        style={{
          width: "100%",
          height: "8px",
          background: "#E5E7EB",
          borderRadius: "999px",
        }}
      >
        <div
          style={{
            width: `${progress}%`,
            height: "100%",
            background:
              "#4F46E5",
            borderRadius:
              "999px",
          }}
        />
      </div>
    </div>
  );
};

export default ChallengeProgressBar;