 import "./NotificationStates.css"
 
 
 
 const NotificationEmptyState = () => {
  return (
    <section className="notification-state">
      <div className="notification-state__content">
        <div className="notification-state__icon">
          🎉
        </div>

        <h2 className="notification-state__title">
          You're all caught up
        </h2>

        <p className="notification-state__text">
          There are no new accountability
          updates right now.
        </p>
      </div>
    </section>
  );
};

export default NotificationEmptyState;