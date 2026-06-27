 const NotificationBadge = ({
  count,
}) => {
  if (!count) {
    return null;
  }

  return (
    <span
      aria-label={`${count} unread notifications`}
    >
      {count > 99
        ? "99+"
        : count}
    </span>
  );
};

export default NotificationBadge;