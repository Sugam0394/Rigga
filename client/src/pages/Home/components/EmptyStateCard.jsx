import { Link } from "react-router-dom";
import "./EmptyStateCard.css"


const EmptyStateCard = () => {
  return (
 <div className="empty-state-card">
  <h2>
    Start Your First Commitment
  </h2>

  <p>
    Create a commitment,
    assign a witness,
    and stay accountable
    until the deadline.
  </p>

  <Link
    to="/challenges/create"
    className="empty-state-card__cta"
  >
    Create Commitment
  </Link>
</div>
  );
};

export default EmptyStateCard;