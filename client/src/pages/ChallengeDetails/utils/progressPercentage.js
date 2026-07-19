export const getProgressStatus = (percentage = 0) => {
  const progress =
    Math.max(0, Math.min(100, Number(percentage) || 0));

  if (progress >= 81) {
    return {
      variant: "success",
      color: "green",
      text: `${progress}%`,
    };
  }

  if (progress >= 61) {
    return {
      variant: "warning",
      color: "yellow",
      text: `${progress}%`,
    };
  }

  if (progress >= 31) {
    return {
      variant: "attention",
      color: "orange",
      text: `${progress}%`,
    };
  }

  return {
    variant: "danger",
    color: "red",
    text: `${progress}%`,
  };
};