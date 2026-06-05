import accountabilityService
  from "../services/accountabilityService.js";

const getMotivationMessage = async (req, res) => {
    try {
      const message =
        accountabilityService
          .generateMotivation();

      res.status(200).json({
        success: true,
        data: message,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  };

export default {
  getMotivationMessage,
};