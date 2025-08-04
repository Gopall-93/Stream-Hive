import { axiosInstance } from "../axiosInstance";
import { userLogin } from "./Slice/userSlice";
import { redirect } from "@tanstack/react-router";

export const userApiReq = async () => {
  
  try {
    const { data } = await axiosInstance.post("/getuser", {
      withCredentials: true,
    });
    return data;
  } catch (error) {
    const { success } = error.response.data;
    return success;
  }
};

export const getUser = async ( context ) => {
  
  const { queryClient, store } = context;
  

  try {
    const { userDetails } = await queryClient.ensureQueryData({
      queryKey: ["authUser"],
      queryFn: userApiReq,
    });
    if (userDetails) {
      store.dispatch(userLogin(userDetails));
    } else {
      store.dispatch(userLogin(null));
    }
  } catch (error) {
    console.log(error);
    store.dispatch(userLogin(null));
  }
};
