import {
  CHALLENGE_DURATION_TYPES,
  SHORT_CHALLENGE_HOURS,
} from "../constants/challengeDuration";

const getChallengeDurationType = ({
  startDate,
  endDate,
}) => {
  const durationHours =
    (new Date(endDate) -
      new Date(startDate)) /
    (1000 * 60 * 60);

  if (
    durationHours <
    SHORT_CHALLENGE_HOURS
  ) {
    return (
      CHALLENGE_DURATION_TYPES.SHORT
    );
  }

  return (
    CHALLENGE_DURATION_TYPES.LONG
  );
};

export default {
  getChallengeDurationType,
};