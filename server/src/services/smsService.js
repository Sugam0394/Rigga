import axios from "axios";

const sendOtp = async (
  phone,
  otp
) => {
  const url =
    process.env.MSG91_BASE_URL;

  const payload = {
    template_id:
      process.env.MSG91_TEMPLATE_ID,

    sender:
      process.env.MSG91_SENDER_ID,

    mobile: `91${phone}`,

    otp,
  };

  const headers = {
    authkey:
      process.env.MSG91_API_KEY,

    "Content-Type":
      "application/json",
  };

  try {
    await axios.post(
      url,
      payload,
      {
        headers,
      }
    );
  } catch (error) {
    console.error(
      "SMS Provider Error:",
      error.response?.data || error.message
    );

    throw new Error(
      "SMS delivery failed"
    );
  }
};

export default {
  sendOtp,
};