const NotificationItem = ({  notification,
}) => {
  return (
    <article>
      <h3>
        {notification.title}
      </h3>

      <p>
        {notification.message}
      </p>

      <small>
        {new Date(
          notification.createdAt
        ).toLocaleString()}
      </small>
    </article>
  );
};

export default NotificationItem;