import { User } from "../models/userModel.js";
import { getTodayUTC, isSameDayUTC, isYesterdayUTC } from "../utils/dateUtils.js";

export const updateUserStreak = async (phone) => {
  const today = getTodayUTC();

  let user = await User.findOne({ phone });

  // 🆕 New user
  if (!user) {
    user = await User.create({
      phone,
      currentStreak: 1,
      longestStreak: 1,
      lastActiveDate: today,
    });

    return {
      user,
      message: "🔥 Day 1! Let’s start strong 💪",
    };
  }

  // ✅ Already active today
  if (isSameDayUTC(user.lastActiveDate, today)) {
    return {
      user,
      message: `⚡ Already done today! Streak: ${user.currentStreak}`,
    };
  }

  // ✅ Yesterday active → increase streak
  if (isYesterdayUTC(user.lastActiveDate)) {
    user.currentStreak += 1;

    if (user.currentStreak > user.longestStreak) {
      user.longestStreak = user.currentStreak;
    }
  } else {
    // ❌ Missed day → reset
    user.currentStreak = 1;
  }

  user.lastActiveDate = today;
  await user.save();

  return {
    user,
    message: `🔥 Streak: ${user.currentStreak} days`,
  };
};