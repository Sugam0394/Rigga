 import NotificationItem from "./NotificationItem";

import "./NotificationList.css";

const NotificationList = ({
  notifications,
  onNotificationRead,
}) => {
  return (
    <ul className="notification-list">
      {notifications.map(
        (notification) => (
          <li
            key={notification._id}
            className="notification-list__item"
          >
            <NotificationItem
              notification={notification}
              onNotificationRead={
                onNotificationRead
              }
            />
          </li>
        )
      )}
    </ul>
  );
};

export default NotificationList;