import userNotificationService
  from "../services/userNotificationService.js";

 export const getNotificationTimeline = async (
  req,
  res,
  next
) => {
  try {

    const notifications =
      await userNotificationService
        .getNotificationTimeline(
          req.user.userId
        );

    res.status(200).json({
      success: true,
      data: notifications,
    });

  } catch (error) {
    next(error);
  }
};

export const getUnreadCount = async (req, res, next) => {
    try {
      const count =
        await userNotificationService
          .getUnreadCount(
            req.user.userId
          );

      res.status(200).json({
        success: true,
        data: {
          count,
        },
      });

    } catch (error) {
      next(error);
    }
  };

export const markNotificationRead =  async (req, res, next) => {
    try {
      const notification =
         await userNotificationService
  .markNotificationRead(
    req.params.id,
    req.user.userId
  );

      res.status(200).json({
        success: true,
        data: notification,
      });

    } catch (error) {
      next(error);
    }
  };

export const markAllNotificationsRead =  async (req, res, next) => {
    try {
      await userNotificationService
        .markAllNotificationsRead(
          req.user.userId
        );

      res.status(200).json({
        success: true,
      });

    } catch (error) {
      next(error);
    }
  };

  export const getNotificationSummary = async (
  req,
  res,
  next
) => {
  try {

    const summary =
      await userNotificationService
        .getNotificationSummary(
          req.user.userId
        );

    res.status(200).json({
      success: true,
      data: summary,
    });

  } catch (error) {
    next(error);
  }
};

export const getUnreadNotifications = async (
  req,
  res,
  next
) => {
  try {

    const notifications =
      await userNotificationService
        .getUnreadNotifications(
          req.user.userId
        );

    res.status(200).json({
      success: true,
      data: notifications,
    });

  } catch (error) {
    next(error);
  }
};

export const getNotification = async (
  req,
  res,
  next
) => {
  try {

    const notification =
      await userNotificationService
        .getNotification(
          req.user.userId,
          req.params.id
        );

    res.status(200).json({
      success: true,
      data: notification,
    });

  } catch (error) {
    next(error);
  }
};