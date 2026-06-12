const dispatchReminder =
  async (reminder) => {
    console.log(
      `[REMINDER TRIGGERED] ${reminder._id}`
    );
  };

export default {
  dispatchReminder,
};