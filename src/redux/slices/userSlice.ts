import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { IUser } from "@/types";

interface IUserState {
  currentUser: IUser | null;
  clientSecret: string;
}

const initialState: IUserState = {
  currentUser: null,
  clientSecret: "",
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setCurrentUser: (state, action: PayloadAction<IUser | null>) => {
      state.currentUser = action.payload;
    },
    setClientSecret: (state, action: PayloadAction<string>) => {
      state.clientSecret = action.payload;
    },
  },
});

export const { setCurrentUser, setClientSecret } = userSlice.actions;

export default userSlice.reducer;
