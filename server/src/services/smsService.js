 import axios from "axios";

const sendOtp = async (phone, otp) => {
  const url =
    `${process.env.MSG91_BASE_URL}?template_id=${process.env.MSG91_TEMPLATE_ID}&mobile=91${phone}&authkey=${process.env.MSG91_API_KEY}`;

  const payload = {
    OTP: otp,
  };

  try {
    const response = await axios.post(
      url,
      payload,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    console.log("========== MSG91 SUCCESS ==========");
    console.log(response.data);
    console.log("===================================");

    return response.data;

  } catch (error) {

    console.log("========== MSG91 ERROR ==========");

    if (error.response) {
      console.log(error.response.status);
      console.log(error.response.data);
    } else {
      console.log(error.message);
    }

    console.log("=================================");

    throw new Error("SMS delivery failed");
  }
};

export default {
  sendOtp,
};