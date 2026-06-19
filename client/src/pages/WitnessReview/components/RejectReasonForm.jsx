const RejectionReasonForm = ({
  reason,
  onReasonChange,
  error,
}) => {
  return (
    <div>
      <h3>
        Rejection Reason
      </h3>

      <textarea
        value={reason}
        onChange={(e) =>
          onReasonChange(
            e.target.value
          )
        }
        rows={6}
        placeholder="Explain why the challenge is being rejected..."
      />

      {error && (
        <p>
          {error}
        </p>
      )}
    </div>
  );
};

export default RejectionReasonForm;