 import "./NotificationStates.css";

const NotificationErrorState = ({
  message,
  onRetry,
}) => {
  return (
    <section
      className="notification-state"
      role="alert"
      aria-live="assertive"
    >
      <div className="notification-state__content">

        <div className="notification-state__icon">
          ⚠️
        </div>

        <h2 className="notification-state__title">
          Unable to load notifications
        </h2>

        <p className="notification-state__text">
          {message || "Something went wrong while loading your notifications."}
        </p>

        {onRetry && (
          <button
            type="button"
            className="notification-state__button"
            onClick={onRetry}
          >
            Try Again
          </button>
        )}

      </div>
    </section>
  );
};

export default NotificationErrorState;