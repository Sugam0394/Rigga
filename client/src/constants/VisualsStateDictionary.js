const VisualStateDictionary = {

  lifecycle: {

    PENDING_WITNESS: {
      id: "PENDING_WITNESS",
      label: "Waiting For Witness",
      meaning:
        "The commitment has been created but is waiting for a witness to accept.",
      interactionIntent:
        "Invite or wait for witness acceptance.",
    },

    ACTIVE: {
      id: "ACTIVE",
      label: "In Progress",
      meaning:
        "The commitment is active and evidence can be submitted.",
      interactionIntent:
        "Continue building accountability.",
    },

    UNDER_REVIEW: {
      id: "UNDER_REVIEW",
      label: "Under Review",
      meaning:
        "Evidence has been submitted and is awaiting witness verification.",
      interactionIntent:
        "Wait for witness review.",
    },

    REJECTED: {
      id: "REJECTED",
      label: "Awaiting Your Response",
      meaning:
        "The witness rejected the submission.",
      interactionIntent:
        "Review the decision or submit an appeal.",
    },

    APPEALED: {
      id: "APPEALED",
      label: "Under Final Review",
      meaning:
        "The appeal is currently under review.",
      interactionIntent:
        "Wait for the final outcome.",
    },

    COMPLETED: {
      id: "COMPLETED",
      label: "Completed",
      meaning:
        "The commitment has been successfully verified.",
      interactionIntent:
        "No further action required.",
    },

    FAILED: {
      id: "FAILED",
      label: "Challenge Failed",
      meaning:
        "The commitment ended without successful verification.",
      interactionIntent:
        "Review the outcome.",
    },

  },

  attention: {

    REVIEW_REJECTION: {
      id: "REVIEW_REJECTION",
      label: "Review Rejection",
      meaning:
        "The user's immediate attention is required after a rejection.",
      interactionIntent:
        "Open the challenge and review the rejection.",
    },

    WAIT_FOR_WITNESS: {
      id: "WAIT_FOR_WITNESS",
      label: "Waiting For Witness",
      meaning:
        "The next step depends on witness action.",
      interactionIntent:
        "Monitor the review status.",
    },

    SUBMIT_PROGRESS: {
      id: "SUBMIT_PROGRESS",
      label: "Submit Progress Report",
      meaning:
        "Evidence can now be submitted.",
      interactionIntent:
        "Submit today's progress.",
    },

    INVITE_WITNESS: {
      id: "INVITE_WITNESS",
      label: "Invite Witness",
      meaning:
        "A witness is required before the commitment can begin.",
      interactionIntent:
        "Invite a witness.",
    },

  },

  trust: {

    VERIFICATION_SCHEDULED: {
      id: "VERIFICATION_SCHEDULED",
      label: "Verification Scheduled",
      meaning:
        "Witness verification is expected in the future.",
      interactionIntent:
        "Continue the commitment.",
    },

    WITNESS_REVIEWING: {
      id: "WITNESS_REVIEWING",
      label: "Witness Reviewing",
      meaning:
        "The witness is reviewing submitted evidence.",
      interactionIntent:
        "Wait for verification.",
    },

    WITNESS_REJECTED: {
      id: "WITNESS_REJECTED",
      label: "Witness Rejected",
      meaning:
        "The witness rejected the evidence.",
      interactionIntent:
        "Review the rejection.",
    },

    VERIFICATION_COMPLETE: {
      id: "VERIFICATION_COMPLETE",
      label: "Verification Complete",
      meaning:
        "Witness verification has finished successfully.",
      interactionIntent:
        "View the completed commitment.",
    },

    APPEAL_UNDER_REVIEW: {
      id: "APPEAL_UNDER_REVIEW",
      label: "Appeal Under Review",
      meaning:
        "The appeal is awaiting a final decision.",
      interactionIntent:
        "Wait for the outcome.",
    },

    VERIFICATION_FAILED: {
      id: "VERIFICATION_FAILED",
      label: "Verification Failed",
      meaning:
        "Verification ended unsuccessfully.",
      interactionIntent:
        "Review the final result.",
    },

  },

  temporal: {

    DEADLINE: {
      id: "DEADLINE",
      label: "Deadline",
      meaning:
        "The scheduled completion time.",
      interactionIntent:
        "Monitor remaining time.",
    },

    REMAINING_TIME: {
      id: "REMAINING_TIME",
      label: "Remaining Time",
      meaning:
        "Time remaining before the deadline.",
      interactionIntent:
        "Stay on schedule.",
    },

    DEADLINE_PASSED: {
      id: "DEADLINE_PASSED",
      label: "Deadline Passed",
      meaning:
        "The commitment deadline has passed.",
      interactionIntent:
        "Review the commitment status.",
    },

  },

  runtime: {

  LOADING: {
    id: "LOADING",
    label: "Loading",
    meaning:
      "Rigga is preparing runtime data.",
    interactionIntent:
      "Wait.",
  },

  ERROR: {
    id: "ERROR",
    label: "Error",
    meaning:
      "Runtime data could not be loaded.",
    interactionIntent:
      "Retry.",
  },

  EMPTY: {
    id: "EMPTY",
    label: "Empty",
    meaning:
      "No data is currently available.",
    interactionIntent:
      "Create a commitment.",
  },

  SUCCESS: {
    id: "SUCCESS",
    label: "Ready",
    meaning:
      "Runtime loaded successfully.",
    interactionIntent:
      "Continue using Rigga.",
  },

  loadingState: {
    title:
      "Loading Your Commitments",

    description:
      "Preparing your Accountability Command Center...",
  },

  errorState: {
    title:
      "Unable To Load Your Commitments",

    retry:
      "Retry",
  },

  emptyState: {

  title:
    "Every commitment starts with a promise.",

  description:
    "Rigga turns personal promises into verified commitments. Choose a witness, track your progress, and know that your witness will verify the outcome.",

  journey: {

    promise:
      "Promise",

    commitment:
      "Commitment",

    verification:
      "Verification",

    credibility:
      "Credibility",

  },

  action:
    "Create Commitment",

},

},

  interaction: {

    OPEN_CHALLENGE: {
      id: "OPEN_CHALLENGE",
      label: "Open Commitment",
      meaning:
        "Navigate to the selected commitment.",
      interactionIntent:
        "Open details.",
    },

    RETRY: {
      id: "RETRY",
      label: "Retry",
      meaning:
        "Attempt the failed action again.",
      interactionIntent:
        "Retry loading.",
    },

    CREATE_COMMITMENT: {
      id: "CREATE_COMMITMENT",
      label: "Create Commitment",
      meaning:
        "Begin a new accountability journey.",
      interactionIntent:
        "Start a commitment.",
    },

  },
  attentionSection: {

  title:
    "Immediate Action",

},

};

export default VisualStateDictionary;