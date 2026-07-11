import apiClient from "../../../api/apiClient";

export const getDashboardRuntime =
  async () => {

    const response =
      await apiClient.get(
        "/dashboard/runtime"
      );

    return response.data.data;
};