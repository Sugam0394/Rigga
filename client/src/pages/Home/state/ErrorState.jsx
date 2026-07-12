 import VisualStateDictionary
  from "../../../constants/VisualsStateDictionary.js";

import "./ErrorState.css";

const ErrorState = ({
  message,
  onRetry,
}) => {

  const {
    title,
    retry,
  } =
    VisualStateDictionary.runtime.errorState;

  return (

    <div className="error-state">

      <h2>
        {title}
      </h2>

      <p>
        {message}
      </p>

      <button
        onClick={onRetry}
        className="error-state__button"
      >
        {retry}
      </button>

    </div>

  );

};

export default ErrorState;