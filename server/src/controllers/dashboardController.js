 import dashboardService
  from "../services/dashboardService.js";

const getChallengeDashboard = async (req, res) => {
    try {
      const dashboard =
        await dashboardService
          .getChallengeDashboard(
            req.params.id
          );

      res.status(200).json({
        success: true,
        data: dashboard,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  };

export default {
  getChallengeDashboard,
};