

const buildReminderViewModel = ({
  reminders,
  status,
  decision,
  history,
  loading,
  error,
}) => {

  return {

    reminders:
      reminders ?? [],

    status:
      status ?? null,

    decision:
      decision ?? null,

    history:
      history ?? [],

    loading:
      loading ?? false,

    error:
      error ?? null,

  };

};

export default {
  buildReminderViewModel,
};