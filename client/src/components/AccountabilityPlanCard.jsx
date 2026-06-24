 const AccountabilityPlanCard = ({
accountabilityPlan,
}) => {

if (!accountabilityPlan) {
return null;
}

const formatCategory = (
category
) => {
 
const labels = {
  WAKE_UP:
    "Wake Up",

  READING:
    "Reading",

  FITNESS:
    "Fitness",

  STUDY:
    "Study",

  MEDITATION:
    "Meditation",

  QUIT_SMOKING:
    "Quit Smoking",

  CUSTOM:
    "Custom",
};

return (
  labels[category] ||
  category
);
 

};

const formatReminder = (
offset
) => {

 
if (offset === 0) {
  return "Checkpoint Time";
}

return `${Math.abs(offset)} Hours Before`;
 

};

const formatCheckpoint = (
day,
index,
total
) => {

 
if (
  index === total - 1
) {
  return `Day ${day} Final Review`;
}

return `Day ${day} Review`;
 

};

return ( <section className="accountability-plan-card">
 
  <h2>
    Accountability Plan
  </h2>

  <p>
    Rigga identified this challenge as:
    {" "}
    <strong>
      {formatCategory(
  accountabilityPlan.category ||
  "CUSTOM"
)}
    </strong>
  </p>

  <h3>
    Recommended Evidence
  </h3>

  <ul>
    {(accountabilityPlan
      .evidenceRecommendations || [])
      .map((item) => (
        <li key={item}>
          ✓ {item}
        </li>
      ))}
  </ul>

  <h3>
    Accountability Checkpoints
  </h3>

  <ul>
    {(accountabilityPlan
      .checkpointStrategy
      ?.checkpointDays || [])
      .map(
        (
          day,
          index,
          array
        ) => (
          <li key={day}>
            {
              formatCheckpoint(
                day,
                index,
                array.length
              )
            }
          </li>
        )
      )}
  </ul>

  <h3>
    Reminder Strategy
  </h3>

  <ul>
    {(accountabilityPlan
      .reminderStrategy
      ?.reminderOffsets || [])
      .map((offset) => (
        <li key={offset}>
          {
            formatReminder(
              offset
            )
          }
        </li>
      ))}
  </ul>

</section>
 

);
};

export default AccountabilityPlanCard;
