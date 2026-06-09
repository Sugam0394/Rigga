 



const WitnessStep = ({
  formData,
  errors,
  handleChange,
  handleNext,
  handleBack,
}) => {
  return (
    <div>
      <h1>
        Who will verify your success?
      </h1>

      <input
        type="text"
        placeholder="Witness Name"
        value={formData.witnessName}
        onChange={(e) =>
          handleChange(
            "witnessName",
            e.target.value
          )
        }
      />

      {errors.witnessName && (
        <p>{errors.witnessName}</p>
      )}

      <input
        type="tel"
        placeholder="+919876543210"
        value={formData.witnessPhone}
        onChange={(e) =>
          handleChange(
            "witnessPhone",
            e.target.value
          )
        }
      />

      {errors.witnessPhone && (
        <p>{errors.witnessPhone}</p>
      )}

      <h2>
        How will your witness verify you succeeded?
      </h2>

      <textarea
        rows={5}
        placeholder="Complete at least 25 gym visits before the deadline."
        value={
          formData.successCriteria
        }
        onChange={(e) =>
          handleChange(
            "successCriteria",
            e.target.value
          )
        }
      />

      <small>
        Be specific. Your witness
        uses this to decide.
      </small>

      {errors.successCriteria && (
        <p>
          {errors.successCriteria}
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

export default WitnessStep;