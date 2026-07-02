 const CommitmentStep = ({
  formData,
  errors,
  handleChange,
  handleNext,
  showNavigation = true,
}) => {
  const characterCount =
    formData.title.length;

  return (
    <div className="challenge-step">
      <h1 className="challenge-step__title">
        What commitment are you making?
      </h1>

      <p className="challenge-step__description">
        Describe the commitment you are making.
        This is the promise Rigga will help you keep.
      </p>

      <textarea
        value={formData.title}
        onChange={(e) =>
          handleChange(
            "title",
            e.target.value
          )
        }
        placeholder="Wake up at 6:00 AM every morning for the next 30 days."
        rows={6}
      />

      <p>
        {characterCount}/200
      </p>

      {errors.title && (
        <p>
          {errors.title}
        </p>
      )}

      {showNavigation && (
        <button
          onClick={handleNext}
        >
          Next
        </button>
      )}
    </div>
  );
};

export default CommitmentStep;