const NotificationErrorState = ({
  message,
}) => {
  return (
    <section>
      <h2>
        Something went wrong
      </h2>

      <p>
        {message}
      </p>
    </section>
  );
};

export default NotificationErrorState;