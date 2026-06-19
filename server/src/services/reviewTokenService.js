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
  const baseUrl =
    process.env.FRONTEND_BASE_URL;

  if (!baseUrl) {
    throw new Error(
      "FRONTEND_BASE_URL is not configured"
    );
  }

  return `${baseUrl}/review/${token}`;
};

export default {
  generateReviewToken,
  generateReviewTokenExpiry,
  buildReviewUrl,
};