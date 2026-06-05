import reminderService from "../services/reminderService.js";

 const getChallengeReminders = async (
  req,
  res
) => {
  try {
    const reminders =
      await reminderService.getChallengeReminders(
        req.params.id
      );

    res.status(200).json({
      success: true,
      data: reminders,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
}; 

export default {
  getChallengeReminders,
};