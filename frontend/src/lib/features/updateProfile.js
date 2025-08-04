import { axiosInstance } from "../axiosInstance";

export const updateProfile = async (formData) => {
  const response = await axiosInstance.patch(
    "/update/profile",
    { ...formData },
    { withCredentials: true }
  );
  return response.data; // important for mutation to get data
};
