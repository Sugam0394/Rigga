 const generateObservationStrategy = ({
  title = "",
  successCriteria = "",
  durationDays = 1,
}) => {
  return {
    version: 1,

    observationMode:
      "STANDARD",

    cadence:
      "FLEXIBLE",

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