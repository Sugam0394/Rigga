 import observationResolverRules
  from "../constants/observationResolverRules.js";

import {observationRuntimeRules} from "../constants/observationRuntimeRules.js";

const generateObservationStrategy = ({
  title,
  successCriteria,
  durationDays,
}) => {
  if (
    !title ||
    !successCriteria ||
    !Number.isFinite(durationDays) ||
    durationDays <= 0
  ) {
    throw new Error(
      "Invalid observation strategy inputs"
    );
  }

  const observationMode =
    observationResolverRules
      .getObservationMode({
        durationDays,
      });

  return {
    version: 1,

    observationMode,

    generatedFrom: {
      title,
      successCriteria,
      durationDays,
    },
  };
};

const getObservationRuntime = ({
  observationStrategy,
}) => {
  if (
    !observationStrategy ||
    !observationStrategy.observationMode
  ) {
    throw new Error(
      "Observation Strategy is required"
    );
  }

  return observationRuntimeRules
    .getObservationRuntime({
      observationMode:
        observationStrategy.observationMode,
    });
};

export default {
  generateObservationStrategy,
  getObservationRuntime,
};