import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface UserReducerState {
  connected: boolean;
  address: string;
  ens: string;
}

const userReducerInitialState: UserReducerState = {
  connected: false,
  address: "",
  ens: "",
};

export const userSlice = createSlice({
  name: "users",
  initialState: userReducerInitialState,
  reducers: {
    setUserAddress(state, action: PayloadAction<string>) {
      state.address = action.payload;
    },
    setUserENS(state, action: PayloadAction<string>) {
      state.ens = action.payload;
    },
  },
});

export const { setUserAddress } = userSlice.actions;
