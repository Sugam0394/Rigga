import authService
  from "../services/authService.js";
  import cookieOptions from "../config/cookieConfig.js";

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
  await authService.verifyOtp(
    req.body.phone,
    req.body.otp
  );

res.cookie(
  "token",
  result.token,
  cookieOptions
);

res.status(200).json({
  success: true,
  message:
    "OTP verified successfully",
});
  } catch (error) {
    res.status(400).json({
      success: false,
      message:
        error.message,
    });
  }
};

const getCurrentUser = async (req, res) => {
    try {
      const user =
        await authService
          .getCurrentUser(
            req.user.userId
          );

      res.status(200).json({
        success: true,
        data: user,
      });
    } catch (error) {
      res.status(404).json({
        success: false,
        message:
          error.message,
      });
    }
  };

  const logout = async (
  req,
  res
) => {
  try {
   res.clearCookie(
  "token",
  cookieOptions
);

    return res
      .status(200)
      .json({
        success: true,
        message:
          "Logged out successfully",
      });
  } catch (error) {
    return res
      .status(500)
      .json({
        success: false,
        message:
          "Logout failed",
      });
  }
};

export default {
  requestOtp,
  verifyOtp,
  getCurrentUser,
  logout,
};
 