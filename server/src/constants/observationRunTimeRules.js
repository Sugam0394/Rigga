 import { OBSERVATION_MODES } from "./observationModes.js";

 export const getObservationRuntime = ({
  observationMode,
}) => {
  switch (observationMode) {
    case OBSERVATION_MODES.END_ONLY:
      return {
        allowsIntermediateSubmissions: false,
        observationWindow: "COMPLETION",
        maxReportsPerWindow: 1,
      };

    case OBSERVATION_MODES.DAILY:
      return {
        allowsIntermediateSubmissions: true,
        observationWindow: "DAY",
        maxReportsPerWindow: 1,
      };

    case OBSERVATION_MODES.CHECKPOINT:
      return {
        allowsIntermediateSubmissions: true,
        observationWindow: "CHECKPOINT",
        maxReportsPerWindow: 1,
      };

    default:
      throw new Error(
        "Unsupported observation mode"
      );
  }
};

 