 import observationResolverRules
  from "../constants/observationResolverRules.js";

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

export default {
  generateObservationStrategy,
};