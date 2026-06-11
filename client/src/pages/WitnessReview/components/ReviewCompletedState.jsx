 const ReviewCompletedState = ({
  decision,
}) => {

  return (
    <div>
      <h2>
        Review Completed
      </h2>

      {
        decision ===
        "APPROVED" ? (
          <p>
            Review submitted successfully.
          </p>
        ) : (
          <p>
            Your feedback has been sent to the user.
          </p>
        )
      }
    </div>
  );
};

export default ReviewCompletedState;