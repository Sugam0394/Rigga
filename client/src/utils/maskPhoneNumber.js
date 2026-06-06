export const maskPhoneNumber = (
  countryCode,
  phoneNumber
) => {
  const lastFour = phoneNumber.slice(-4);

  return `${countryCode} ••••••${lastFour}`;
};