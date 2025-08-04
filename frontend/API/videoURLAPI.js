import { axiosInstance } from "../src/lib/axiosInstance";

export const getVideoURLAPI = async (videoId, viewerId) => {
  try {
    const { data } = await axiosInstance.get(`/watch/${videoId}/${viewerId}`, {
      withCredentials: true,
    });
    return data.channel;
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
};
