import { OBSERVATION_MODES } from "./observationModes.js";

const getObservationMode = ({
  durationDays,
}) => {
  if (
    !Number.isFinite(durationDays) ||
    durationDays <= 0
  ) {
    throw new Error(
      "Invalid observation duration"
    );
  }

  if (durationDays <= 1) {
    return OBSERVATION_MODES.END_ONLY;
  }

  if (durationDays <= 30) {
    return OBSERVATION_MODES.DAILY;
  }

  return OBSERVATION_MODES.CHECKPOINT;
};

export default {
  getObservationMode,
};