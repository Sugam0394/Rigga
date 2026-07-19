export const getDeadlineStatus = (deadlineAt) => {
  if (!deadlineAt) {
    return {
      text: "No Deadline",
      variant: "neutral",
    };
  }

  const now = new Date();
  const deadline = new Date(deadlineAt);

  const diff =
    deadline.getTime() - now.getTime();

  if (diff <= 0) {
    return {
      text: "Deadline Reached",
      variant: "neutral",
    };
  }

  const totalMinutes =
    Math.floor(diff / (1000 * 60));

  const totalHours =
    Math.floor(diff / (1000 * 60 * 60));

  const totalDays =
    Math.floor(diff / (1000 * 60 * 60 * 24));

  if (totalDays > 7) {
    const hours =
      totalHours % 24;

    return {
      text: `${totalDays} Days ${hours} Hours Remaining`,
      variant: "safe",
    };
  }

  if (totalDays >= 3) {
    const hours =
      totalHours % 24;

    return {
      text: `${totalDays} Days ${hours} Hours Remaining`,
      variant: "warning",
    };
  }

  if (totalHours >= 24) {
    const hours =
      totalHours % 24;

    return {
      text: `${totalDays} Days ${hours} Hours Remaining`,
      variant: "critical",
    };
  }

  if (totalHours >= 1) {
    return {
      text: `${totalHours} Hours Remaining`,
      variant: "critical",
    };
  }

  return {
    text: `${totalMinutes} Minutes Remaining`,
    variant: "critical",
  };
};