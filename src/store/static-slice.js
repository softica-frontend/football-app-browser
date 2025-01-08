import { createSlice } from "@reduxjs/toolkit";

export const staticSlice = createSlice({
  name: "static",
  initialState: { balls: null, players: null },
  reducers: {
    setStatic: (state, action) => {
      return action.payload;
    },
  },
});

export const { setStatic } = staticSlice.actions;
export const staticReducer = staticSlice.reducer;
