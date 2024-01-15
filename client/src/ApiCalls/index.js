import axios from "axios";
import { toast } from "react-toastify";

const fetchUserData = async (token) => {
  try {
    const response = await axios.post(
      `${process.env.REACT_APP_BASE_URL}/api/user/getUserData`,
      { token },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    if (response.data.success) {
      return response.data.data;
    } else {
      return null;
    }
  } catch (error) {
    console.log("Error while fetching the user data:", error);
    return null;
  }
};
const markNotificationAsRead = async (token) => {
  try {
    const response = await axios.post(
      `${process.env.REACT_APP_BASE_URL}/api/user/get-all-notification`,
      { token },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    console.log(response.data);
    if (response.data.success) {
      toast.success(response.data.message);
      return response.data.data;
    } else {
      toast.info(response.data.message);
      return null;
    }
  } catch (error) {
    console.log("Error while fetching the user data:", error);
    toast.error("something went wrong");
    return null;
  }
};

const deleteNotification = async (token) => {
  try {
    const response = await axios.post(
      `${process.env.REACT_APP_BASE_URL}/api/user/delete-all-notification`,
      { token },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    console.log(response.data);
    if (response.data.success) {
      toast.success(response.data.message);
      return response.data.data;
    } else {
      toast.info(response.data.message);
      return null;
    }
  } catch (error) {
    console.log("Error while fetching the user data:", error);
    toast.error("something went wrong");
    return null;
  }
};

export { fetchUserData, markNotificationAsRead, deleteNotification };
