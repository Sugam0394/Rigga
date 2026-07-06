import reminderService from "../services/reminderService.js";

 const getChallengeReminders = async (
  req,
  res
) => {
  try {
     const reminders =
  await reminderService
    .getChallengeReminders(
      req.params.id,
      req.user.userId
    );

    res.status(200).json({
      success: true,
      data: reminders,
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

const getReminderStatus = async (
  req,
  res
) => {
  try {
    const reminderStatus =
      await reminderService.getReminderStatus(
        req.params.id,
        req.user.userId
      );

    res.status(200).json({
      success: true,
      data: reminderStatus,
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

const getReminderDecision = async (
  req,
  res
) => {
  try {
    const decision =
      await reminderService.getReminderDecision(
        req.params.id,
        req.user.userId
      );

    res.status(200).json({
      success: true,
      data: decision,
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

export default {
  getChallengeReminders,
  getReminderStatus,
  getReminderDecision,
};