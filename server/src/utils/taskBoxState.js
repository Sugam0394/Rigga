export const transitionTaskBoxState = (taskBox, event) => {
  // This is a barebones starter; extend as you go!
  /*
    event: 'submit_proof', 'deadline_passed', 'roast_sent', etc.
    Returns: next status, level
  */
  let { status, level } = taskBox;

  if (event === "submit_proof") {
    status = "done";
    level = 4;
  } else if (event === "deadline_passed") {
    status = "failed";
    level = Math.min(level + 1, 4);
  }
  // You can add more events: 'proof_invalid', 'witness_notified', etc.

  return { status, level };
};