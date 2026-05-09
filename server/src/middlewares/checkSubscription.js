 export const checkSubscription = (
  req,
  res,
  next
) => {
  try {
    const user = req.user;

    // Not paid
    if (
      user.subscriptionStatus !== "paid"
    ) {
      return res.status(403).json({
        message:
          "Access denied. Please subscribe.",
      });
    }

    // No expiry date
    if (!user.subscriptionExpiry) {
      return res.status(403).json({
        message:
          "Subscription expired.",
      });
    }

    // Expiry check
    const now = new Date();

    const expiry = new Date(
      user.subscriptionExpiry
    );

    if (expiry < now) {
      return res.status(403).json({
        message:
          "Subscription expired.",
      });
    }

    next();
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      message:
        "Subscription middleware failed",
    });
  }
};