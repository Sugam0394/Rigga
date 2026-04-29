export const canUseFeature = (user) => {
  if (user.subscriptionStatus === "paid") return true;

  // free users limit
  if (user.currentStreak >= 3) {
    return false;
  }

  return true;
};