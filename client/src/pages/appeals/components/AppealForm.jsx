 import { useState } from "react";

const AppealForm = ({
  onSubmit,
  loading,
}) => {
  const [notes, setNotes] =
    useState("");

  const [imageUrl, setImageUrl] =
    useState("");

  const [validationError,
    setValidationError] =
    useState("");

  const handleSubmit = (
    event
  ) => {
    event.preventDefault();

    const trimmedNotes =
      notes.trim();

    if (!trimmedNotes) {
      setValidationError(
        "Appeal explanation is required"
      );
      return;
    }

    if (
      trimmedNotes.length < 50
    ) {
      setValidationError(
        "Appeal explanation must be at least 50 characters"
      );
      return;
    }

    if (
      trimmedNotes.length > 1000
    ) {
      setValidationError(
        "Appeal explanation cannot exceed 1000 characters"
      );
      return;
    }

    setValidationError("");

    onSubmit({
      notes: trimmedNotes,
      imageUrl,
    });
  };

  return (
    <form
      onSubmit={
        handleSubmit
      }
    >
      <div>
        <label>
          Appeal Explanation
        </label>

        <textarea
          value={notes}
          onChange={(e) =>
            setNotes(
              e.target.value
            )
          }
          rows={8}
        />

        <p>
          {notes.length}/1000
        </p>
      </div>

      <div>
        <label>
          Evidence Image URL
        </label>

        <input
          type="text"
          value={imageUrl}
          onChange={(e) =>
            setImageUrl(
              e.target.value
            )
          }
        />
      </div>

      {validationError && (
        <p>
          {validationError}
        </p>
      )}

      <button
        type="submit"
        disabled={loading}
      >
        {loading
          ? "Submitting..."
          : "Submit Appeal"}
      </button>
    </form>
  );
};

export default AppealForm;