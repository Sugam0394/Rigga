import "./ErrorState.css";

const ErrorState = ({
  message,
  onRetry,
}) => {
  return (
    <div className="error-state">
      <h2>
        Something Went Wrong
      </h2>

      <p>
        {message}
      </p>

      <button
        onClick={onRetry}
        className="error-state__button"
      >
        Try Again
      </button>
    </div>
  );
};

export default ErrorState;