import "./ErrorState.css";

const ErrorState = ({
  message,
  onRetry,
}) => {
  return (
    <div className="error-state">
     <h2>
  Unable To Load Your Commitments
</h2>

<p>
  {message}
</p>

<button
  onClick={onRetry}
  className="error-state__button"
>
  Retry
</button>
    </div>
  );
};

export default ErrorState;