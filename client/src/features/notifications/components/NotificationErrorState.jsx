 import "./NotificationStates.css"
 
 
 const NotificationErrorState = ({
  message,
}) => {
  return (
    <section className="notification-state">
      <div className="notification-state__content">
        <div className="notification-state__icon">
          ⚠️
        </div>

        <h2 className="notification-state__title">
          Unable to load notifications
        </h2>

        <p className="notification-state__text">
          {message}
        </p>
      </div>
    </section>
  );
};

export default NotificationErrorState;