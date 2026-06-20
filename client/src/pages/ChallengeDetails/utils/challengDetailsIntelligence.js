export const getDeadlineContext = (
  deadlineAt
) => {
  const deadline =
    new Date(deadlineAt);

  const today =
    new Date();

  const days =
    Math.ceil(
      (deadline - today) /
      (1000 * 60 * 60 * 24)
    );

  if (days <= 0)
    return "Deadline reached";

  if (days <= 2)
    return "Requires attention soon";

  if (days <= 7)
    return "Due this week";

  return "On track";
};