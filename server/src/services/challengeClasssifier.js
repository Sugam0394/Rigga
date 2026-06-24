 import {
  CHALLENGE_CATEGORIES,
} from "../constants/challengeCategories.js";

const classifyChallenge = ({
  title = "",
  successCriteria = "",
}) => {

  const text =
    `${title} ${successCriteria}`
      .toLowerCase();

  const wakeUpKeywords = [
    "wake up",
    "wakeup",
    "alarm",
    "morning",
    "6 am",
    "5 am",
    "early",
  ];

  const readingKeywords = [
    "read",
    "reading",
    "book",
    "books",
    "pages",
    "chapter",
  ];

  const fitnessKeywords = [
    "run",
    "running",
    "walk",
    "walking",
    "jog",
    "jogging",
    "gym",
    "workout",
    "exercise",
    "fitness",
    "steps",
    "km",
  ];

  const studyKeywords = [
    "study",
    "studying",
    "course",
    "lecture",
    "exam",
    "practice",
    "revision",
    "learn",
    "learning",
  ];

  const meditationKeywords = [
    "meditation",
    "meditate",
    "mindfulness",
    "breathing",
  ];

  const quitSmokingKeywords = [
    "quit smoking",
    "stop smoking",
    "nicotine",
    "cigarette",
    "cigarettes",
    "tobacco",
  ];

  if (
    wakeUpKeywords.some(
      (keyword) =>
        text.includes(keyword)
    )
  ) {
    return {
      category:
        CHALLENGE_CATEGORIES.WAKE_UP,
    };
  }

  if (
    readingKeywords.some(
      (keyword) =>
        text.includes(keyword)
    )
  ) {
    return {
      category:
        CHALLENGE_CATEGORIES.READING,
    };
  }

  if (
    fitnessKeywords.some(
      (keyword) =>
        text.includes(keyword)
    )
  ) {
    return {
      category:
        CHALLENGE_CATEGORIES.FITNESS,
    };
  }

  if (
    studyKeywords.some(
      (keyword) =>
        text.includes(keyword)
    )
  ) {
    return {
      category:
        CHALLENGE_CATEGORIES.STUDY,
    };
  }

  if (
    meditationKeywords.some(
      (keyword) =>
        text.includes(keyword)
    )
  ) {
    return {
      category:
        CHALLENGE_CATEGORIES.MEDITATION,
    };
  }

  if (
    quitSmokingKeywords.some(
      (keyword) =>
        text.includes(keyword)
    )
  ) {
    return {
      category:
        CHALLENGE_CATEGORIES.QUIT_SMOKING,
    };
  }

  return {
    category:
      CHALLENGE_CATEGORIES.CUSTOM,
  };
};

export default {
  classifyChallenge,
};