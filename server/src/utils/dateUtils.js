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
  return new Date(today.getTime() - 24 * 60 * 60 * 1000);
};

export const isSameDayUTC = (d1, d2) => {
  if (!d1 || !d2) return false;

  const a = new Date(d1);
  const b = new Date(d2);

  return (
    a.getUTCFullYear() === b.getUTCFullYear() &&
    a.getUTCMonth() === b.getUTCMonth() &&
    a.getUTCDate() === b.getUTCDate()
  );
};

export const isYesterdayUTC = (date) => {
  if (!date) return false;
  return isSameDayUTC(date, getYesterdayUTC());
};