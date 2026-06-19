const WitnessAnalyticsCard = ({
  analytics,
}) => {
  return (
    <div className="card">

      <h3>
        Witness Funnel
      </h3>

      <div>
        Shared:
        {analytics.shared}
      </div>

      <div>
        Opened:
        {analytics.opened}
      </div>

      <div>
        Started:
        {analytics.started}
      </div>

      <div>
        Submitted:
        {analytics.submitted}
      </div>

    </div>
  );
};

export default
  WitnessAnalyticsCard;