import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  channelInfo: null,
  isLoggedIn: false,
};

export const channelInfoSlice = createSlice({
  name: "channelInfo",
  initialState,
  reducers: {
    setChannelInfo: (state, action) => {
      state.channelInfo = action.payload;
      state.isLoggedIn = true;
    },

    setLogoout: (state) => {
      (state.channelInfo = null), (state.isLoggedIn = false);
    },
  },
});

export const {setChannelInfo,setLogoout} = channelInfoSlice.actions
export default channelInfoSlice.reducer
