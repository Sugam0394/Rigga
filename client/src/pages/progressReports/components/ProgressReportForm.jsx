import { useState } from "react";

import ProgressNotesInput
  from "./ProgressNotesInput";

import ProgressImageUpload
  from "./ProgressImageUpload";

const ProgressReportForm = ({
  onSubmit,
  loading,
}) => {
  const [notes, setNotes] =
    useState("");

  const [image, setImage] =
    useState(null);

  const [error, setError] =
    useState("");

  const handleSubmit = async (
    event
  ) => {
    event.preventDefault();

    setError("");

    if (
      notes.trim().length < 20
    ) {
      setError(
        "Progress notes must be at least 20 characters."
      );

      return;
    }

    if (!image) {
      setError(
        "Evidence image is required."
      );

      return;
    }

    await onSubmit({
      notes,
      image,
    });
  };

  return (
    <form
      onSubmit={
        handleSubmit
      }
    >
      <ProgressNotesInput
        value={notes}
        onChange={(event) =>
          setNotes(
            event.target.value
          )
        }
      />

      <ProgressImageUpload
        image={image}
        onChange={setImage}
        onRemove={() =>
          setImage(null)
        }
      />

      {error && (
        <p>{error}</p>
      )}

      <button
        type="submit"
        disabled={loading}
      >
        {loading
          ? "Submitting..."
          : "Submit Progress Report"}
      </button>
    </form>
  );
};

export default
  ProgressReportForm;