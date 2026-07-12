 import VisualStateDictionary
  from "../../../constants/VisualsStateDictionary.js";

import "./LoadingState.css";

const LoadingState = () => {

  const {
    title,
    description,
  } =
    VisualStateDictionary.runtime.loadingState;

  return (
    <div className="loading-state">

      <h2>
        {title}
      </h2>

      <p>
        {description}
      </p>

    </div>
  );
};

export default LoadingState;