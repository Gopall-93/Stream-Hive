import { axiosInstance } from "../axiosInstance";

export const updatePassword = async (formData) => {
  try {
    const data = axiosInstance.patch(
      "/update/password",
      { ...formData },
      { withCredentials: true }
    );
    return data
  } catch (error) {
    throw error
  }
};
