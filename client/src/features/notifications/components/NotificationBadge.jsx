 const NotificationBadge = ({
  count,
}) => {
  if (!count) {
    return null;
  }

  return (
    <span>
      {count > 99
        ? "99+"
        : count}
    </span>
  );
};

export default NotificationBadge;