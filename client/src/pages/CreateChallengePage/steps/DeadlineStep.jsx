const DeadlineStep = ({
  formData,
  errors,
  handleChange,
  handleNext,
  handleBack,
}) => {
  const tomorrow =
    new Date();

  tomorrow.setDate(
    tomorrow.getDate() + 1
  );

  const minDate =
    tomorrow
      .toISOString()
      .split("T")[0];

  return (
    <div>
      <h1>
        When must this be completed?
      </h1>

      <input
        type="date"
        value={formData.deadline}
        min={minDate}
        onChange={(e) =>
          handleChange(
            "deadline",
            e.target.value
          )
        }
      />

      {errors.deadline && (
        <p>
          {errors.deadline}
        </p>
      )}

      <div>
        <button
          onClick={handleBack}
        >
          Back
        </button>

        <button
          onClick={handleNext}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default DeadlineStep;