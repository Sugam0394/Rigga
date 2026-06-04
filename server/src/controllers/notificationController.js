import notificationService from "../services/notificationService.js";

export const getChallengeNotifications = async (req, res) => {
    try {
      const { id } = req.params;

      const notifications =
        await notificationService.getNotificationsByChallenge(
          id
        );

      res.status(200).json({
        success: true,
        data: notifications,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  };