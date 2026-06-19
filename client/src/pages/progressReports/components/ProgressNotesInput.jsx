const ProgressNotesInput = ({
  value,
  onChange,
}) => {
  return (
    <div>
      <label
        htmlFor="progress-notes"
      >
        What progress did you make?
      </label>

      <textarea
        id="progress-notes"
        value={value}
        onChange={onChange}
        rows={6}
        maxLength={1000}
        placeholder="Completed my scheduled workout and finished 45 minutes of cardio..."
      />

      <p>
        {value.length}/1000
      </p>
    </div>
  );
};

export default ProgressNotesInput;