const CommitmentStep = ({
  formData,
  errors,
  handleChange,
  handleNext,
}) => {
  const characterCount =
    formData.title.length;

  return (
    <div>
      <h1>
        What commitment are you making?
      </h1>

      <textarea
        value={formData.title}
        onChange={(e) =>
          handleChange(
            "title",
            e.target.value
          )
        }
        placeholder="Wake up at 6 AM for 30 days"
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

      <button
        onClick={handleNext}
      >
        Next
      </button>
    </div>
  );
};

export default CommitmentStep;