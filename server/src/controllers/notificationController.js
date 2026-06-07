 import notificationService from "../services/notificationService.js";

export const getChallengeNotifications = async (
  req,
  res
) => {
  try {
    const { id } = req.params;

    const notifications =
      await notificationService
        .getNotificationsByChallenge(
          id,
          req.user.userId
        );

    res.status(200).json({
      success: true,
      data: notifications,
    });

  } catch (error) {

    let statusCode = 500;

    if (
      error.message ===
      "Challenge not found"
    ) {
      statusCode = 404;
    }

    if (
      error.message ===
      "Forbidden"
    ) {
      statusCode = 403;
    }

    res.status(statusCode).json({
      success: false,
      message: error.message,
    });
  }
};
  