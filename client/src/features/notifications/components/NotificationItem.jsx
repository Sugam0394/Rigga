 import useMarkNotificationRead from "../hooks/useNotificationRead";

const NotificationItem = ({
  notification,
}) => {

  const {
    markAsRead,
  } = useMarkNotificationRead();

  const handleClick =
    async () => {

      if (
        notification.isRead
      ) {
        return;
      }

      await markAsRead(
        notification._id
      );
    };

  return (
    <article
      onClick={
        handleClick
      }
    >
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