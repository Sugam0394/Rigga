const HistoryErrorState = ({
  onRetry,
}) => {

  return (
    <section
      className="history-error-state"
    >

      <h2>
        Unable to Load History
      </h2>

      <p>
        Something went wrong while
        loading your challenge history.
      </p>

      <button
        type="button"
        onClick={onRetry}
      >
        Retry
      </button>

    </section>
  );

};

export default HistoryErrorState;