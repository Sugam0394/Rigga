import "./NotificationStates.css"
 
 
 
 const NotificationLoadingState = () => {
  return (
    <section className="notification-state">
      <div className="notification-state__content">
        <div className="notification-state__loader"></div>

        <p className="notification-state__text">
          Loading your latest accountability updates...
        </p>
      </div>
    </section>
  );
};

export default NotificationLoadingState;