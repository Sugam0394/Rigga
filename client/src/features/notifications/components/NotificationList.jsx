 import NotificationItem
  from "./NotificationItem";

const NotificationList = ({
  notifications,
}) => {
  return (
    <ul>
      {notifications.map(
        (notification) => (
          <li
            key={
              notification._id
            }
          >
            <NotificationItem
              notification={
                notification
              }
            />
          </li>
        )
      )}
    </ul>
  );
};

export default NotificationList;