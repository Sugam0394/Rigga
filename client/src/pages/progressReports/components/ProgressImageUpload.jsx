const ProgressImageUpload = ({
  image,
  onChange,
  onRemove,
}) => {
  return (
    <div>
      <label>
        Upload proof of your progress
      </label>

      <input
        type="file"
        accept="image/*"
        onChange={(event) =>
          onChange(
            event.target.files[0]
          )
        }
      />

      {image && (
        <div>
          <img
            src={URL.createObjectURL(
              image
            )}
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