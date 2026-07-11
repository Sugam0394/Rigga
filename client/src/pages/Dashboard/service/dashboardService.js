import { getDashboardRuntime }
  from "../api/dashboardApi.js";

const loadDashboardRuntime =
  async () => {

    return await getDashboardRuntime();

};

export default {
  loadDashboardRuntime,
};