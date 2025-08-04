import { axiosInstance } from "../axiosInstance";
import { setChannelInfo, setLogoout } from "./Slice/channelInfoSlice";

const channelAPI = async (channelname) => {
  try {
    const { data } = await axiosInstance.get(`/channel-info/${channelname}`, {
      withCredentials: true,
    });
    return data.channel;
  } catch (error) {
    const { success } = error.response.data;
    return success;
  }
};

export const getChannelInfo = async (context, params) => {
  const { queryClient, store } = context;
  const channelname = params.channelName;

  try {
    const data = await queryClient.ensureQueryData({
      queryKey: ["channelInfo"],
      queryFn: async () => await channelAPI(channelname),
    });
    if (data) {
        
      store.dispatch(setChannelInfo(data))
    }
    else{
        store.dispatch(setLogoout())
    }
  } catch (error) {
    store.dispatch(setLogoout())
  }
};
