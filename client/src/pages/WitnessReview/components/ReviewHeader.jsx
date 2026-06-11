const ReviewHeader = ({
  title,
  status,
}) => {
  return (
    <div>
      <h1>
        Witness Review
      </h1>

      <h2>
        {title}
      </h2>

      <p>
        Status: {status}
      </p>
    </div>
  );
};

export default ReviewHeader;