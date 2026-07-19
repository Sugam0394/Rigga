import "./WitnessJourneyTimeline.css";

const WitnessJourneyTimeline = ({
  assigned = false,
  invited = false,
  reviewStarted = false,
  decided = false,
  decisionLabel = "Pending",
}) => {
  const steps = [
    {
      key: "assigned",
      label: "Assigned",
      completed: assigned,
      active:
        !assigned,
    },
    {
      key: "invite",
      label: "Invite",
      completed: invited,
      active:
        assigned &&
        !invited,
    },
    {
      key: "review",
      label: "Review",
      completed: reviewStarted,
      active:
        invited &&
        !reviewStarted,
    },
    {
      key: "decision",
      label: "Decision",
      completed: decided,
      active:
        reviewStarted &&
        !decided,
    },
  ];

  return (
    <section className="witness-timeline">

      <p className="witness-timeline__title">
        Verification Journey
      </p>

      <div className="witness-timeline__track">

        {steps.map((step, index) => (
          <div
            key={step.key}
            className="witness-timeline__step"
          >
            <div
              className={[
                "witness-timeline__node",
                step.completed &&
                  "witness-timeline__node--completed",
                step.active &&
                  "witness-timeline__node--active",
              ]
                .filter(Boolean)
                .join(" ")}
            />

            {index < steps.length - 1 && (
              <div
                className={[
                  "witness-timeline__line",
                  step.completed &&
                    "witness-timeline__line--completed",
                ]
                  .filter(Boolean)
                  .join(" ")}
              />
            )}

            <span className="witness-timeline__label">
              {step.label}
            </span>
          </div>
        ))}
      </div>

      <p className="witness-timeline__status">
        {decided
          ? `Decision: ${decisionLabel}`
          : "Awaiting witness decision"}
      </p>

    </section>
  );
};

export default WitnessJourneyTimeline;