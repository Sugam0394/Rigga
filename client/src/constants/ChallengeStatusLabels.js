

import VisualStateDictionary
  from "./VisualsStateDictionary.js";

const challengeStatusLabels = {

  PENDING_WITNESS:
    VisualStateDictionary
      .lifecycle
      .PENDING_WITNESS
      .label,

  ACTIVE:
    VisualStateDictionary
      .lifecycle
      .ACTIVE
      .label,

  UNDER_REVIEW:
    VisualStateDictionary
      .lifecycle
      .UNDER_REVIEW
      .label,

  REJECTED:
    VisualStateDictionary
      .lifecycle
      .REJECTED
      .label,

  APPEALED:
    VisualStateDictionary
      .lifecycle
      .APPEALED
      .label,

  COMPLETED:
    VisualStateDictionary
      .lifecycle
      .COMPLETED
      .label,

  FAILED:
    VisualStateDictionary
      .lifecycle
      .FAILED
      .label,

};

export default challengeStatusLabels;