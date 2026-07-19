export const getStreakStatus = (streak = 0) => {
  const currentStreak =
    Math.max(0, Number(streak) || 0);

  if (currentStreak >= 30) {
    return {
      variant: "elite",
      color: "blue",
      text: `${currentStreak} Days`,
    };
  }

  if (currentStreak >= 7) {
    return {
      variant: "success",
      color: "green",
      text: `${currentStreak} Days`,
    };
  }

  if (currentStreak >= 3) {
    return {
      variant: "warning",
      color: "orange",
      text: `${currentStreak} Days`,
    };
  }

  if (currentStreak >= 1) {
    return {
      variant: "danger",
      color: "red",
      text: `${currentStreak} Days`,
    };
  }

  return {
    variant: "neutral",
    color: "gray",
    text: "No Streak",
  };
};