import {
  CHALLENGE_CATEGORIES,
} from "../constants/challengeCategories.js";

const getReminderStrategy = ({
  category,
}) => {

  if (
    category ===
    CHALLENGE_CATEGORIES.QUIT_SMOKING
  ) {
    return {
      reminderOffsets: [
        -24,
        -12,
        -6,
        0,
      ],
    };
  }

  if (
    category ===
    CHALLENGE_CATEGORIES.WAKE_UP
  ) {
    return {
      reminderOffsets: [
        -24,
        -6,
        0,
      ],
    };
  }

  return {
    reminderOffsets: [
      -24,
      0,
    ],
  };
};

export default {
  getReminderStrategy,
};