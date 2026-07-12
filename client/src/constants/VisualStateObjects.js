import VisualStateDictionary
  from "./VisualsStateDictionary.js";

const getLifecycleState = (
  state
) => {

  return (
    VisualStateDictionary
      .lifecycle[state] ||
    null
  );

};

const getAttentionState = (
  state
) => {

  return (
    VisualStateDictionary
      .attention[state] ||
    null
  );

};

const getTrustState = (
  state
) => {

  return (
    VisualStateDictionary
      .trust[state] ||
    null
  );

};

const getRuntimeState = (
  state
) => {

  return (
    VisualStateDictionary
      .runtime[state] ||
    null
  );

};

const getTemporalState = (
  state
) => {

  return (
    VisualStateDictionary
      .temporal[state] ||
    null
  );

};

const getInteractionState = (
  state
) => {

  return (
    VisualStateDictionary
      .interaction[state] ||
    null
  );

};

const getTrustStateFromLifecycle = (
  lifecycleState
) => {

  const mapping = {

    PENDING_WITNESS:
      "VERIFICATION_PENDING",

    ACTIVE:
      "VERIFICATION_SCHEDULED",

    UNDER_REVIEW:
      "WITNESS_REVIEWING",

    REJECTED:
      "WITNESS_REJECTED",

    APPEALED:
      "APPEAL_UNDER_REVIEW",

    COMPLETED:
      "VERIFICATION_COMPLETE",

    FAILED:
      "VERIFICATION_FAILED",

  };

  return getTrustState(
    mapping[
      lifecycleState
    ]
  );

};

export default {

  getLifecycleState,

  getAttentionState,

  getTrustState,

  getRuntimeState,

  getTemporalState,

  getInteractionState,

  getTrustStateFromLifecycle,

};