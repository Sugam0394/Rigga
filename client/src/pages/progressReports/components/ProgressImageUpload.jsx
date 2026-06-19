 import {
  useEffect,
  useState,
} from "react";

const ProgressImageUpload = ({
  image,
  onChange,
  onRemove,
}) => {
  const [
    previewUrl,
    setPreviewUrl,
  ] = useState(null);

  useEffect(() => {
    if (!image) {
      setPreviewUrl(null);
      return;
    }

    const url =
      URL.createObjectURL(
        image
      );

    setPreviewUrl(url);

    return () => {
      URL.revokeObjectURL(
        url
      );
    };
  }, [image]);

  const handleFileChange = (
    event
  ) => {
    const file =
      event.target.files[0];

    if (!file) {
      return;
    }

    if (
      !file.type.startsWith(
        "image/"
      )
    ) {
      alert(
        "Please select a valid image."
      );
      return;
    }

    onChange(file);
  };

  return (
    <div>
      <label>
        Upload proof of your progress
      </label>

      <input
        type="file"
        accept="image/*"
        onChange={
          handleFileChange
        }
      />

      {image && (
        <div>
          <img
            src={previewUrl}
            alt="Preview"
            width="200"
          />

          <button
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