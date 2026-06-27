 const NotificationErrorState = ({
  message,
}) => {
  return (
    <section>
      <h2>
        Unable to load notifications
      </h2>

      <p>
        {message}
      </p>
    </section>
  );
};

export default NotificationErrorState;