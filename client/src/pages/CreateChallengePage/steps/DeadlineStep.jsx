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

  const minDateTime =
    tomorrow
      .toISOString()
      .slice(0, 16);

  return (
    <div>
      <h1>
        When must this be completed?
      </h1>

      <input
        type="datetime-local"
        value={
          formData.deadlineAt
        }
        min={minDateTime}
        onChange={(e) =>
          handleChange(
            "deadlineAt",
            e.target.value
          )
        }
      />

      {errors.deadlineAt && (
        <p>
          {errors.deadlineAt}
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