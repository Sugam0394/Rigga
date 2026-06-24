 import {
  CHALLENGE_CATEGORIES,
} from "../constants/challengeCategories.js";

const uniqueDays = (days) => {
  return [...new Set(days)];
};

const getCheckpointStrategy = ({
  category,
  durationDays,
}) => {

  if (
    category ===
    CHALLENGE_CATEGORIES.WAKE_UP
  ) {
    return {
      checkpointDays:
        uniqueDays([
          Math.min(
            7,
            durationDays
          ),

          Math.min(
            15,
            durationDays
          ),

          durationDays,
        ]),
    };
  }

  if (
    category ===
    CHALLENGE_CATEGORIES.QUIT_SMOKING
  ) {
    return {
      checkpointDays:
        uniqueDays([
          Math.min(
            3,
            durationDays
          ),

          Math.min(
            7,
            durationDays
          ),

          Math.min(
            15,
            durationDays
          ),

          durationDays,
        ]),
    };
  }

  return {
    checkpointDays:
      uniqueDays([
        Math.ceil(
          durationDays / 2
        ),

        durationDays,
      ]),
  };
};

export default {
  getCheckpointStrategy,
};