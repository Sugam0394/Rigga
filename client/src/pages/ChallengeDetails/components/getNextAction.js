 const getNextAction = (status) => {
  switch (status) {
    case "ACTIVE":
      return {
        title: "Submit Progress Report",
        description:
          "Continue building accountability by submitting evidence.",
      };

    case "UNDER_REVIEW":
      return {
        title: "Await Witness Review",
        description:
          "Your witness is currently reviewing submitted evidence.",
      };

    case "REJECTED":
      return {
        title: "Review Rejection",
        description:
          "Review the witness decision and submit an appeal if necessary.",
      };

    case "APPEALED":
      return {
        title: "Await Appeal Outcome",
        description:
          "Your appeal is under review.",
      };

    case "COMPLETED":
      return {
        title: "Commitment Verified",
        description:
          "No further action required.",
      };

    case "FAILED":
      return {
        title: "Commitment Failed",
        description:
          "This commitment was not successfully completed. No further actions are available.",
      };

    default:
      return {
        title: "Unknown Challenge State",
        description:
          "Rigga could not determine the current accountability state.",
      };
  }
};

export default getNextAction;