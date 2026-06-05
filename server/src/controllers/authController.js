import authService
  from "../services/authService.js";

const requestOtp = async (
  req,
  res
) => {
  try {
    const result =
      await authService
        .requestOtp(
          req.body.phone
        );

    res.status(200).json({
      success: true,
      data: result,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message:
        error.message,
    });
  }
};

const verifyOtp = async (
  req,
  res
) => {
  try {
    const result =
      await authService
        .verifyOtp(
          req.body.phone,
          req.body.otp
        );

    res.status(200).json({
      success: true,
      data: result,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message:
        error.message,
    });
  }
};

export default {
  requestOtp,
  verifyOtp,
};