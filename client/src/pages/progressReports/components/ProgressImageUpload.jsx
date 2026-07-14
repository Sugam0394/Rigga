 import {
  useEffect,
  useState,
} from "react";

import "./ProgressImageUpload.css";

const ProgressImageUpload = ({
  image,
  onChange,
  onRemove,
}) => {
  const [
    previewUrl,
    setPreviewUrl,
  ] = useState(null);

  // Error state jo code me use ho rahi thi, use declare kiya
  const [error, setError] = useState("");

  useEffect(() => {
    if (!image) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setPreviewUrl(null);
      return;
    }

    const url = URL.createObjectURL(image);
    
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setPreviewUrl(url);

    return () => {
      URL.revokeObjectURL(url);
    };
  }, [image]);

  const handleFileChange = (
    event
  ) => {
    const file =
      event.target.files?.[0];

    if (!file) {
      return;
    }

    if (
      !file.type.startsWith(
        "image/"
      )
    ) {
      setError(
        "Please select a valid image."
      );
      return;
    }

    setError("");
    onChange(file);
  };

  return (
    <div className="progress-image-upload">
      <label
        className="progress-image-upload__label"
        htmlFor="progress-image"
      >
        Upload proof of your progress
      </label>

      <input
        id="progress-image"
        className="progress-image-upload__input"
        type="file"
        accept="image/*"
        onChange={handleFileChange}
      />

      {error && (
        <p
          className="progress-image-upload__error"
          role="alert"
        >
          {error}
        </p>
      )}

      {image && (
        <div className="progress-image-upload__preview">
          <img
            className="progress-image-upload__image"
            src={previewUrl}
            alt="Selected progress evidence preview"
          />

          <button
            className="progress-image-upload__remove"
            type="button"
            onClick={onRemove}
          >
            Remove Image
          </button>
        </div>
      )}
    </div>
  );
};

export default ProgressImageUpload;