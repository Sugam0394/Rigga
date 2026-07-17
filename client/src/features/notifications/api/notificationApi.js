import api from "../../../api/apiClient";

export const getNotifications = async () => {
    const response =
      await api.get(
        "/notifications"
      );

    return response.data;
  };

export const getUnreadCount =  async () => {
    const response =
      await api.get(
        "/notifications/unread-count"
      );

    return response.data;
  };

export const markNotificationRead = async (
    notificationId
  ) => {
    const response =
      await api.patch(
        `/notifications/${notificationId}/read`
      );

    return response.data;
  };

export const markAllNotificationsRead = async () => {
    const response =
      await api.patch(
        "/notifications/read-all"
      );

    return response.data;
  };


  export const getNotification = async (
  notificationId
) => {

  const response =
    await api.get(
      `/notifications/${notificationId}`
    );

  return response.data;

};

export const getNotificationSummary = async () => {

  const response =
    await api.get(
      "/notifications/summary"
    );

  return response.data;

};