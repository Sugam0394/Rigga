 import "./ProgressNotesInput.css";

const ProgressNotesInput = ({
  value,
  onChange,
}) => {

  return (

    <div className="progress-notes">

      <label
        className="progress-notes__label"
        htmlFor="progress-notes"
      >
        What progress did you make?
      </label>

      <textarea
        id="progress-notes"
        className="progress-notes__textarea"
        value={value}
        onChange={onChange}
        rows={6}
        maxLength={1000}
        aria-describedby="progress-notes-counter"
        placeholder="Completed my scheduled workout and finished 45 minutes of cardio..."
      />

      <p
        id="progress-notes-counter"
        className="progress-notes__counter"
      >
        {value.length}/1000 characters
      </p>

    </div>

  );

};

export default ProgressNotesInput;