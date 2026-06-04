 import crypto from "crypto";

const generateReviewToken = () => {
  return crypto.randomBytes(32).toString("hex");
};

const generateReviewTokenExpiry = () => {
  const expiry = new Date();

  expiry.setDate(expiry.getDate() + 7);

  return expiry;
};

const buildReviewUrl = (token) => {
  return `https://rigga.app/review/${token}`;
};

export default {
  generateReviewToken,
  generateReviewTokenExpiry,
  buildReviewUrl,
};