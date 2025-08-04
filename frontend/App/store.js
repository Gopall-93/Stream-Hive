import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../src/lib/features/Slice/userSlice";
import  channelInfoReducer  from "../src/lib/features/Slice/channelInfoSlice";

export default configureStore({
  reducer: {
    user: userReducer,
    channelInfo:channelInfoReducer,
  },
});
