
const ReviewCompletedState = ({
  decision,
}) => {

  return (
    <div>
      <p>
  Review submitted successfully.
  Your review helps maintain accountability.
</p>

      {
        decision ===
        "APPROVED" ? (
          <p>
            Review submitted successfully.
          </p>
        ) : (
         <p>
  Your feedback has been sent to the user.
  Thank you for helping maintain accountability.
</p>
        )
      }
    </div>
  );
};

export default ReviewCompletedState;