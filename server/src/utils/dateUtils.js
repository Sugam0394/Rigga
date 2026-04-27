// ✅ Always UTC use karo

export const getTodayUTC = () => {
  const now = new Date();
  return new Date(Date.UTC(
    now.getUTCFullYear(),
    now.getUTCMonth(),
    now.getUTCDate()
  ));
};

export const getYesterdayUTC = () => {
  const today = getTodayUTC();
  today.setUTCDate(today.getUTCDate() - 1);
  return today;
};

export const isSameDayUTC = (d1, d2) => {
  if (!d1 || !d2) return false;

  return d1.toISOString().slice(0, 10) ===
         d2.toISOString().slice(0, 10);
};

export const isYesterdayUTC = (date) => {
  if (!date) return false;
  return isSameDayUTC(date, getYesterdayUTC());
};