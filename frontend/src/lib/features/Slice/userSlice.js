import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  isLoggedIn: false,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    userLogin: (state, action) => {
      if(action.payload === null){
        state.isLoggedIn=false
        state.user = null;
        return
      }
      state.user = action.payload;
      state.isLoggedIn = true;
    },
    userLogout: (state) => {
      (state.user = null), (state.isLoggedIn = false);
    },
  },
});

export const { userLogin, userLogout } = userSlice.actions;
export default userSlice.reducer;
