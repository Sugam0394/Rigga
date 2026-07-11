import dashboardHomeService
  from "./dashboardHomeService.js";

const buildHomeDashboard = async ({
  userId,
}) => {

  const dashboard =
    await dashboardHomeService
      .getHomeDashboard(
        userId
      );

  return {
    ...dashboard,
  };
};

export default {
  buildHomeDashboard,
};