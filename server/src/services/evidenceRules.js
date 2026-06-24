import {
  CHALLENGE_CATEGORIES,
} from "../constants/challengeCategories.js";

const EVIDENCE_RULES = {
  [CHALLENGE_CATEGORIES.WAKE_UP]: [
    "Morning Selfie",
    "Alarm Screenshot",
    "Lock Screen Time",
  ],

  [CHALLENGE_CATEGORIES.READING]: [
    "Book Page Photo",
    "Reading Notes",
    "Chapter Summary",
  ],

  [CHALLENGE_CATEGORIES.FITNESS]: [
    "Workout Screenshot",
    "Distance Screenshot",
    "Route Map",
  ],

  [CHALLENGE_CATEGORIES.STUDY]: [
    "Study Notes",
    "Practice Work",
    "Progress Screenshot",
  ],

  [CHALLENGE_CATEGORIES.MEDITATION]: [
    "Meditation App Screenshot",
    "Session Log",
    "Reflection Note",
  ],

  [CHALLENGE_CATEGORIES.QUIT_SMOKING]: [
    "Habit Tracker Screenshot",
    "Daily Check-In",
    "Progress Notes",
  ],

   [CHALLENGE_CATEGORIES.CUSTOM]: [
  "Progress Screenshot",
  "Photo Evidence",
  "Written Update",
],
};

const getEvidenceRecommendations =
  (category) => {
  return (
  EVIDENCE_RULES[
    category
  ] ||
  EVIDENCE_RULES[
    CHALLENGE_CATEGORIES.CUSTOM
  ]
);
  };

export default {
  getEvidenceRecommendations,
};