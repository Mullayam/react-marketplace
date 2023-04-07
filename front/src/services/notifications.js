import { AxiosInstance } from "../apis/axiosInstance";

export const GetAllNotifications = async () => {
  try {
    const response = await AxiosInstance.post("/notify/all-notifications");
    return response.data;
  } catch (error) {
    return error.message;
  }
};
export const SendAlert = async (Body) => {
  try {
    const response = await AxiosInstance.post("/notify/new-alert", Body);

    return response.data;
  } catch (error) {
    return error.message;
  }
};
export const DeleteNotification = async (notificationId) => {
  try {
    const response = await AxiosInstance.delete(
      `/notify/delete/${notificationId}`
    );

    return response.data;
  } catch (error) {
    return error.message;
  }
};
export const ReadAllNotifications = async () => {
  try {
    const response = await AxiosInstance.put(`/notify/read-notifications`);

    return response.data;
  } catch (error) {
    return error.message;
  }
};
