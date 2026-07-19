 
 
 
 
 const getNextAction = (status) => {

  switch (status) {

    case "ACTIVE":

      return {

        eyebrow: "Immediate Mission",

        icon: "📸",

        tone: "success",

        title: "Submit Progress Report",

        description:
          "Keep your commitment moving forward by submitting today's evidence.",

        statusLabel:
          "Challenge Active",

        buttonLabel:
          "Submit Progress",

      };

    case "UNDER_REVIEW":

      return {

        eyebrow: "Witness Review",

        icon: "🟠",

        tone: "warning",

        title: "Await Witness Review",

        description:
          "Your evidence has been submitted successfully. Your witness is reviewing it now.",

        statusLabel:
          "Review In Progress",

        buttonLabel: null,

      };

    case "REJECTED":

      return {

        eyebrow: "Action Required",

        icon: "🔴",

        tone: "danger",

        title: "Review Rejection",

        description:
          "Your witness rejected the submitted evidence. Review the feedback and appeal if appropriate.",

        statusLabel:
          "Appeal Available",

        buttonLabel:
          "Submit Appeal",

      };

    case "APPEALED":

      return {

        eyebrow: "Appeal Review",

        icon: "⚖️",

        tone: "info",

        title: "Await Appeal Outcome",

        description:
          "Your appeal has been submitted and is currently under review.",

        statusLabel:
          "Appeal Pending",

        buttonLabel: null,

      };

    case "COMPLETED":

      return {

        eyebrow: "Mission Complete",

        icon: "🏆",

        tone: "completed",

        title: "Commitment Verified",

        description:
          "Congratulations. Your commitment has been successfully verified.",

        statusLabel:
          "Completed",

        buttonLabel:
          "View Summary",

      };

    case "FAILED":

      return {

        eyebrow: "Mission Ended",

        icon: "❌",

        tone: "failed",

        title: "Commitment Failed",

        description:
          "The deadline has passed without successful completion. Review your journey and begin your next commitment.",

        statusLabel:
          "Failed",

        buttonLabel:
          "Create New Challenge",

      };

    default:

      return {

        eyebrow: "System Notice",

        icon: "⚠️",

        tone: "neutral",

        title: "Unknown Challenge State",

        description:
          "Rigga could not determine the current accountability state for this commitment.",

        statusLabel:
          "Unavailable",

        buttonLabel: null,

      };

  }

};

export default getNextAction;