import reminderService from "../services/reminderService.js";

const getChallengeReminders = async (req, res) => {
  const reminders = await reminderService.getChallengeReminders(
    req.params.id
  );

  res.status(200).json({
    success: true,
    data: reminders,
  });
};

export default {
  getChallengeReminders,
};