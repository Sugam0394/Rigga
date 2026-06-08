import { Link } from "react-router-dom";

const EmptyStateCard = () => {
  return (
    <div>
      <h2>
        No commitments yet
      </h2>

      <p>
        You have not created a
        commitment yet.
      </p>

      <Link
        to="/challenges/create"
      >
        Create Commitment
      </Link>
    </div>
  );
};

export default EmptyStateCard;